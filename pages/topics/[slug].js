import Layout from "@/components/layout/Layout"
import Breadcrumb from '@/components/layout/Breadcrumb'
import FeaturedArticles from "@/components/sections/FeaturedArticles"
import Image from "next/image"

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
                <section className="blog-section position-relative bg-two">
                  {/*===============spacing==============*/}
                  <div className="pd_top_40" />
                  {/*===============spacing==============*/}
                  <div className="container-xl">
                    <div className="row">
                      <div className="col-12">
                        <h1 className="text-center">{category.name}</h1>
                        <div className="pd_top_20" />
                      </div>
                    </div>
                    <div className="row">
                    {image &&
                      <div className="col-6">
                        <Image 
                          width={image.width} 
                          height={image.height} 
                          src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${image.url}`} 
                          alt={image.alternativeText} 
                          className="img-fluid highlight-shadow" 
                        />
                      </div>
                    }
                      <div className={`${image ? "col-6" : "col-12"}`}>
                        <ReactMarkdown className="text-lg">{category.description}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                    {/*===============spacing==============*/}
                  <div className="pd_top_60" />
                  {/*===============spacing==============*/}
                </section>


                <div className="container-xl">
                    {/*===============spacing==============*/}
                    <div className="pd_top_60" />
                    {/*===============spacing==============*/}
                    <div className="project_all filt_style_one filter_enabled">
                        <PortfolioFilter3Col articles={articles} filters={articleFilters} />
                    </div>
                    {/*===============spacing==============*/}
                    <div className="pd_top_60" />
                    {/*===============spacing==============*/}
                </div>

            </Layout>
        </>
    )
}
