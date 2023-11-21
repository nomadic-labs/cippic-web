import Layout from "@/components/layout/Layout"
import Breadcrumb from '@/components/layout/Breadcrumb'
import Link from "next/link"
import Image from "next/image"
import { Autoplay, Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import ReactMarkdown from 'react-markdown'
import getLayoutData from "@/utils/layout-data"
import FaqSection from '@/components/sections/FaqSection';
import RichTextSection from '@/components/sections/RichTextSection';
import HighlightBox from '@/components/sections/HighlightBox';
import ImageSliderSection from '@/components/sections/ImageSliderSection';
import Fade from 'react-reveal/Fade';
import ArticleCard from "@/components/elements/ArticleCard"
import Header from "@/components/sections/Header"
import { useContext, useState } from 'react'
import { TranslationContext } from '@/contexts/TranslationContext'
import { useRouter } from 'next/router'
import rehypeRaw from 'rehype-raw'
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";


const dynamicContentDict = {
  'common.faq-section': FaqSection,
  'common.paragraph-text-section': RichTextSection,
  'common.highlight-section': HighlightBox,
  'common.image-slider': ImageSliderSection
}

const qs = require('qs');

async function fetchAllArticles(articles, pagination) {
  try {
    const query = qs.stringify(
        {
          locale: "all",
          populate: "*",
          pagination: {
            page: pagination.page + 1,
            pageSize: 100
          },
          publicationState: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 'preview' : 'live'
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${query}`)
    const { data, meta } = await res.json()
    const accumulator = articles.concat(data)

    if (meta.pagination.page < meta.pagination.pageCount) {
      return await fetchAllArticles(accumulator, meta.pagination)
    } else {
      return accumulator
    }
  } catch (e) {
    console.log(e)
    return []
  }
}

export async function getStaticPaths({ locales }) {
  // Call an external API endpoint to get posts  

  if (process.env.NEXT_PUBLIC_PREVIEW_MODE) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  const allArticles = await fetchAllArticles([], {page: 0})

  const paths = allArticles.map((article) => {
    return { params: { slug: article.attributes.slug }, locale: article.attributes.locale }
  })
 
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params, locale }) => {
    const { slug } = params;
    const layout = await getLayoutData(locale)

    const pageQuery = qs.stringify(
      {
        locale: locale,
        filters: {
            slug: {
              $eq: slug,
            },
        },
        populate: {
          '*': true,
          main_image: {
            populate: '*'
          },
          more_images: {
            populate: '*'
          },
          categories: true,
          content_types: true,
          dynamic_content: {
            populate: '*'
          }
        },
        publicationState: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 'preview' : 'live'
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );


    const articleRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${pageQuery}`)
    const articleJson = await articleRes.json()
    const articleData = articleJson.data[0]
    const article = { id: articleData.id, ...articleData.attributes }
    const categoriesArr = article.categories.data.map(c => c.attributes.slug)

    const relatedArticlesQuery = qs.stringify(
      {
        filters: {
          $and: [
            {
              categories: {
                slug: {
                  $in: categoriesArr
                }
              }
            },
            {
              slug: {
                $ne: slug
              }
            },
          ]
        },
        sort: "date_published:desc",
        pagination: {
          start: 0,
          limit: 3
        },
        populate: [
          '*',
          'main_image.media',
          'categories',
          'content_types'
        ],
        publicationState: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 'preview' : 'live'
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const relatedArticlesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${relatedArticlesQuery}`)
    const relatedArticlesJson = await relatedArticlesRes.json()
    const relatedArticles = relatedArticlesJson.data.map(r => r.attributes)

    const content = { article, relatedArticles }

    return { 
      props: { content, layout },
      revalidate: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 10 : false
    }
}

export default function ArticlePage({ content, layout }) {
    const { article, relatedArticles } = content;
    const [openLightbox, setOpenLightbox] = useState(false);
    const { locale } = useRouter()
    const categories = article.categories.data || []
    const content_types = article.content_types.data || []

    let lightboxImages = [];
    let mainImage;
    let moreImages = [];

    if (article.main_image?.data) {
      mainImage = {
        ...article.main_image.data.attributes,
        src: `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${article.main_image.data.attributes.url}`, 
        alt: article.main_image.data.attributes.alternativeText,
        description: article.main_image.data.attributes.caption
      }
      lightboxImages = lightboxImages.concat(mainImage)
    }

    if (article.more_images?.data) {
      moreImages = article.more_images.data.map(img => { 
        return {
          ...img.attributes,
          src: `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${img.attributes.url}`, 
          alt: img.attributes.alternativeText,
          description: img.attributes.caption
        }
      })
      lightboxImages = lightboxImages.concat(moreImages)
    }
    
    const datePublished = new Date(article.date_published)
    const dateLocale = locale === "fr" ? 'fr-CA' : 'en-CA'
    const dateString = datePublished.toLocaleDateString(dateLocale, { year: 'numeric', month: 'short', day: 'numeric' })
    const tags = categories.map(cat => cat.attributes.name).concat(content_types.map(ct => ct.attributes.name))
    const terms = useContext(TranslationContext)

    return (
        <>
            <Layout 
                layout={layout.layout}
                translation={layout.translation}
                topics={layout.categories} 
                contentTypes={layout.contentTypes}
            >
              <main id="main" className="site-main" role="main">
                <Header>
                  <div className="title_sections">
                    <h1 className="title-md mb-4">{article.title}</h1>
                  </div>
                  { article.preview && <p className="text-lg mb-4">{article.preview}</p> }
                  <p className="byline">
                  { article.date_published && <span className="byline">{`${terms.published} ${dateString}`}</span> }
                  { article.author && <span className="byline">{`${terms.by} ${article.author}`}</span> }
                  </p>
                </Header>

                <section className="section-default">
                    <div className="container">
                        <div className="row">
                          { mainImage &&
                            <div className="col-12 col-lg-4 mx-auto order-lg-2 mr_bottom_40">
                              <button onClick={() => setOpenLightbox(true)} className="btn btn-clear p-0">
                              <Image 
                                  width={mainImage.width} 
                                  height={mainImage.height} 
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${mainImage.url}`} 
                                  alt={mainImage.alternativeText} 
                                  className="mr_bottom_10 img-fluid img-full highlight-shadow" 
                              />
                              <p className="text-sm mr_bottom_10">{mainImage.caption}</p>
                              <div className="thumbnails">
                              {
                                moreImages.map(img => {
                                  return (<Image 
                                      key={img.url}
                                      width={40} 
                                      height={40} 
                                      src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${img.url}`} 
                                      alt={img.alternativeText} 
                                      className="img-fluid img-full" 
                                  />)
                                })
                              }
                              </div>
                              </button>
                              <Lightbox
                                plugins={[Captions]}
                                open={openLightbox}
                                close={() => setOpenLightbox(false)}
                                slides={lightboxImages}
                              />
                            </div>
                          }
                            <div className="col-12 col-lg-8 mx-auto order-lg-1">
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                    {article.body}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </section>

                {article.dynamic_content.map((section, index) => {
                  const Component = dynamicContentDict[section.__component];
                  if (!Component) return null
                  return(
                    <Component key={`dynamic-section-${index}`} {...section} />
                  )
                })}

                <section className="section-md bg-white">
                    <div className="container">
                        <div className="row">
                          <div className="col-12">
                            <div className="title-small tags-links m-0">
                              {`${terms.tags}:`}
                              {
                                categories.map(tag => {
                                  return <Link key={tag.attributes.slug} href={`/issues/${tag.attributes.slug}`} className="tag btn btn-simple">{tag.attributes.name}</Link>
                                })
                              }
                              {
                                content_types.map(tag => {
                                  return <Link key={tag.attributes.slug} href={`/our-work/${tag.attributes.slug}`} className="tag btn btn-simple">{tag.attributes.name}</Link>
                                })
                              }
                            </div>
                          </div>
                        </div>
                    </div>
                </section>

                { (relatedArticles.length > 0) && 
                  <section className="section-default bg-two">
                      <div className="container">
                          <div className="row">
                            <div className="col-12 title-section">
                              <h2 className="title-small">{terms.related_articles}</h2>
                            </div>
                          </div>
                          <div className="row news-articles">
                          {
                            relatedArticles.map((article, index) => {
                                return (
                                    <div key={article.slug} className="col-12 col-lg-6 col-xl-4">
                                        <Fade bottom delay={index * 60}>
                                            <ArticleCard 
                                              article={article} 
                                              tagsAttribute="content_types" 
                                              showImage
                                              imageTop
                                              showTags
                                            />
                                        </Fade>
                                    </div>
                                )
                            })
                          }
                        </div>
                      </div>
                  </section>
                }

              </main>
            </Layout>
        </>
    )
}
