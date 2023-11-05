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
          }
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
          categories: true,
          content_types: true,
          dynamic_content: {
            populate: '*'
          }
        }
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
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const relatedArticlesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${relatedArticlesQuery}`)
    const relatedArticlesJson = await relatedArticlesRes.json()
    const relatedArticles = relatedArticlesJson.data.map(r => r.attributes)

    const content = { article, relatedArticles }

    return { props: { content, layout } }
}

export default function ArticlePage({ content, layout }) {
    const { article, relatedArticles } = content;
    const categories = article.categories.data || []
    const content_types = article.content_types.data || []
    const image = article.main_image?.data?.attributes
    const datePublished = new Date(article.date_published)
    const dateString = datePublished.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
    const tags = categories.map(cat => cat.attributes.name).concat(content_types.map(ct => ct.attributes.name))

    return (
        <>
            <Layout 
              layout={layout.layout} 
              topics={layout.categories} 
              contentTypes={layout.contentTypes}
              studentPages={layout.studentPages}
            >
              <main id="main" className="site-main" role="main">
                <Header>
                  <div className="title_sections">
                    <h1 className="title-md mb-4">{article.title}</h1>
                  </div>
                  { article.preview && <p className="text-lg mb-4">{article.preview}</p> }
                  <p className="byline">
                  { article.date_published && <span className="byline">{`Published ${dateString}`}</span> }
                  { article.author && <span className="byline">{`By ${article.author}`}</span> }
                  </p>
                </Header>

                <section className="section-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-8 mx-auto order-lg-1">
                                { image &&
                                    <div className="single_content_upper mr_bottom_30">
                                        <Image 
                                            width={image.width} 
                                            height={image.height} 
                                            src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${image.url}`} 
                                            alt={image.alternativeText} 
                                            className="mr_bottom_20 img-fluid img-full highlight-shadow" 
                                        />
                                        <p className="text-sm">{image.caption}</p>
                                    </div>
                                }
                                <ReactMarkdown>
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
                          <div className="col-12 col-md-8 mx-auto">
                            <div className="title-small tags-links m-0">
                              {`Tags:`}
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
                              <h2 className="title-small">Related Articles</h2>
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
