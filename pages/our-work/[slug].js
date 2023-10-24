import Layout from "@/components/layout/Layout"
import Breadcrumb from '@/components/layout/Breadcrumb'
import FeaturedArticles from "@/components/sections/FeaturedArticles"
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import ArticleCard from "@/components/elements/ArticleCard"
import ReactMarkdown from 'react-markdown'
import dynamic from 'next/dynamic';
import Fade from 'react-reveal/Fade';
import getLayoutData from "@/utils/layout-data"

const PortfolioFilter3Col = dynamic(() => import('@/components/elements/PortfolioFilter3Col'), {
    ssr: false,
})

const qs = require('qs');

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/content-types`)
  const { data, meta } = await res.json()
  const paths = data.map((cat) => ({
    params: { slug: cat.attributes.slug },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
    const layout = await getLayoutData()
    const { slug } = params;

    const contentTypeQuery = qs.stringify(
      {
        filters: {
            slug: {
              $eq: slug,
            },
        },
        populate: [
          '*',
          'icon.media'
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const articlesQuery = qs.stringify(
      {
        filters: {
            content_types: {
                slug: {
                    $eq: slug
                }
            },
        },
        sort: "date_published:desc",
        populate: [
          '*',
          'main_image',
          'main_image.media',
          'categories',
          'content_types'
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const contentTypeRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/content-types?${contentTypeQuery}`)
    const contentTypeJson = await contentTypeRes.json()
    const contentTypeData = contentTypeJson.data[0]
    const contentType = { id: contentTypeData.id, ...contentTypeData.attributes }

    const articlesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${articlesQuery}`)
    const articlesJson = await articlesRes.json()
    const articles = articlesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const content = { contentType, articles }

    return { props: { content, layout } }
}

export default function OurWork({ content, layout }) {
    const { contentType, articles } = content;
    const mainImage = null
    const imagePath = mainImage ? mainImage.attributes.url : null
    const latestArticles = articles.slice(0,3)

    const articleFilters = articles.reduce((filters, article) => {
        const articleCategories = article.categories.data.map(ct => ct.attributes)
        const newFilters = articleCategories.map(act => {
            const filterExists = filters.find(f => f?.slug === act.slug)
            if (!filterExists) {
                return act
            }
        }).filter(i => i)
        return filters.concat(newFilters)
    }, [])

    return (
        <>
            <Layout 
              contact={layout.contact} 
              topics={layout.categories} 
              contentTypes={layout.contentTypes}
              studentPages={layout.studentPages}
            >

            <section className="service-section bg-two section-default">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-section">
                                <h1 className="">{contentType.name}</h1>
                                <h2 className="title-small">{`Latest ${contentType.name}`}</h2>
                            </div>
                        </div>
                        {/*===============spacing==============*/}
                        <div className="mr_bottom_10" />
                        {/*===============spacing==============*/}
                    </div>
                    <div className="row news-articles">
                    {
                            latestArticles.map((article, index) => {
                                const categories = article.categories.data || []
                                const content_types = article.content_types.data || []
                                const datePublished = new Date(article.date_published)
                                const dateString = datePublished.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
                                const tags = categories.map(t => t.attributes.name).join(', ')
                                const image = article.main_image.data ? article.main_image.data.url : null

                                return (
                                    <div key={article.id} className="col-12 col-lg-6 col-xl-4">
                                        <Fade bottom delay={index * 60}>
                                            <ArticleCard 
                                                article={article} 
                                                showDate
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

                <div className="container">
                    <div className="row default_row">
                        <div className="full_width_box">
                            <div className="pd_top_60" />
                            <div className="row">
                        <div className="col-lg-12">
                            <div className="title-section">
                                <h2 className="title-small">{`All ${contentType.name}`}</h2>
                            </div>
                        </div>
                        {/*===============spacing==============*/}
                        <div className="mr_bottom_10" />
                        {/*===============spacing==============*/}
                    </div>
                            <div className="project_all filt_style_one filter_enabled">
                                <PortfolioFilter3Col articles={articles} filters={articleFilters} filterField="categories" />
                            </div>
                            <div className="pd_top_60" />
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}
