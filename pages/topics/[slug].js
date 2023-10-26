import Layout from "@/components/layout/Layout"
import Breadcrumb from '@/components/layout/Breadcrumb'
import FeaturedArticles from "@/components/sections/FeaturedArticles"
import Image from "next/image"
import FancyHeader from "@/components/sections/FancyHeader"

import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import ReactMarkdown from 'react-markdown'
import dynamic from 'next/dynamic';
import getLayoutData from "@/utils/layout-data";

const PortfolioFilter3Col = dynamic(() => import('@/components/elements/PortfolioFilter3Col'), {
    ssr: false,
})

const qs = require('qs');

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/categories`)
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

    const categoryArticlesQuery = qs.stringify(
      {
        filters: {
            slug: {
              $eq: slug,
            },
        },
        populate: [
          '*',
          'icon.media',
          'image.media',
          'articles',
          'articles.categories',
          'articles.content_types',
          'articles.main_image',
          'articles.main_image.media',
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );


    const categoryArticlesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/categories?${categoryArticlesQuery}`)
    const categoryArticlesJson = await categoryArticlesRes.json()
    const categoryData = categoryArticlesJson.data[0]
    const category = { id: categoryData.id, ...categoryData.attributes }

    const content = { category }

    return { props: { content, layout } }
}

export default function TopicsPage({ content, layout }) {
    const { category } = content;
    console.log({category})

    const categories = []
    const content_types = []
    const icon = category.icon?.data?.attributes
    const image = category.image?.data?.attributes
    const articles = category.articles.data.map(art => ({ id: art.id, ...art.attributes }))
    const articleFilters = articles.reduce((filters, article) => {
        const articleContentTypes = article.content_types.data.map(ct => ct.attributes)
        const newFitlers = articleContentTypes.map(act => {
            const filterExists = filters.find(f => f?.slug === act.slug)
            if (!filterExists) {
                return act
            }
        }).filter(i => i)
        return filters.concat(newFitlers)
    }, [])

    return (
        <>
            <Layout 
              contact={layout.contact} 
              topics={layout.categories} 
              contentTypes={layout.contentTypes}
              studentPages={layout.studentPages}
            >
              <FancyHeader
                title={category.name}
                subtitle={category.description}
                iconSrc={category.icon?.data?.attributes?.url}
              />
                
                <section className="position-relative bg-light section-default">
                  <div className="container">
                      <div className="project_all filt_style_one filter_enabled">
                          <PortfolioFilter3Col articles={articles} filters={articleFilters} />
                      </div>
                  </div>
                </section>

            </Layout>
        </>
    )
}
