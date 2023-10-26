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

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles`)
  const { data, meta } = await res.json()
  const paths = data.map((article) => ({
    params: { slug: article.attributes.slug },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
    const { slug } = params;
    const layout = await getLayoutData()

    const pageQuery = qs.stringify(
      {
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
    const tags = categories.map(cat => cat.attributes.name).concat(content_types.map(ct => ct.attributes.name)).join(", ")
    return (
        <>
            <Layout 
              contact={layout.contact} 
              topics={layout.categories} 
              contentTypes={layout.contentTypes}
              studentPages={layout.studentPages}
            >
              <main id="main" className="site-main" role="main">
                <Header>
                  <div className="tags">
                      <i className="icon-folder" />
                      {tags}
                  </div>
                  <div className="title_sections">
                    <div className="title-small">{dateString}</div>
                    <h1 className="title-md">{article.title}</h1>
                  </div>
                  { article.author && <ReactMarkdown>{`By ${article.author}`}</ReactMarkdown> }
                  { article.teaser && <ReactMarkdown className="text-lg">{article.teaser}</ReactMarkdown> }
                </Header>

                <section className="section-default">
                    <div className="container container-reading">
                        <div className="row">
                            <div className="col-12">
                                <div className="single_content_upper">
                                  { image &&
                                    <Image 
                                        width={image.width} 
                                        height={image.height} 
                                        src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${image.url}`} 
                                        alt={image.alternativeText} 
                                        className="mr_bottom_40 img-fluid img-full highlight-shadow rounded-sm" 
                                    />}
                                    <ReactMarkdown>
                                        {article.body}
                                    </ReactMarkdown>
                                </div>
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
