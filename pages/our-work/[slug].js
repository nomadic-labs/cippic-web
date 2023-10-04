import Layout from "@/components/layout/Layout"
import Breadcrumb from '@/components/layout/Breadcrumb'
import FeaturedArticles from "@/components/sections/FeaturedArticles"
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import ReactMarkdown from 'react-markdown'
import dynamic from 'next/dynamic';

const PortfolioFilter3Col = dynamic(() => import('@/components/elements/PortfolioFilter3Col'), {
    ssr: false,
})

const qs = require('qs');

const contactQuery = qs.stringify(
  {
    populate: [
      '*',
      'main_logo.media',
      'uottawa_logo.media'
    ],
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

const categoriesQuery = qs.stringify(
  {
    populate: [
      '*'
    ],
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

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
          'articles',
          'articles.categories',
          'articles.content_types'
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

    const contactRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/organization-information?${contactQuery}`)
    const contact = await contactRes.json()

    const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/categories?${categoriesQuery}`)
    const categoriesJson = await categoriesRes.json()
    const categories = categoriesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const contentTypesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/content-types`)
    const contentTypesJson = await contentTypesRes.json()
    const contentTypes = contentTypesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const content = { category, contact: { ...contact.data.attributes }, categories, contentTypes }

    return { props: { content } }
}

export default function BlogSimple({ content }) {
    console.log({content})
    const { category } = content;

    const swiperOptions = {
        // General
        direction: 'horizontal',
        modules: [Autoplay, Pagination, Navigation],
        slidesPerView: 2,
        spaceBetween: 30,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,

        // Navigation
        navigation: {
            nextEl: '.related-button-next',
            prevEl: '.related-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            575: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            991: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1199: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1350: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
        }
    };

    const categories = []
    const content_types = []
    const mainImage = null
    const imagePath = mainImage ? mainImage.attributes.url : null
    const articles = category.articles.data.map(art => ({ id: art.id, ...art.attributes }))
    console.log({articles})

    return (
        <>
            <Layout headerStyle={1} footerStyle={8} contact={content.contact} topics={content.categories} >
                <div className={`page_header_default style_one blog_single_pageheader`}>
                    <div className="parallax_cover">
                        <div className="simpleParallax">
                        { imagePath && <img src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/${imagePath}`} alt="bg_image" className="cover-parallax" />}
                        </div>
                    </div>
                    <div className="page_header_content">
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="banner_title_inner">
                                        <div className="title_page">
                                            {category.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="breadcrumbs creote text-white text-bold">
                                        <p>{category.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auto-container">
                    <div className="row default_row">
                        <div className="full_width_box">
                            {/*===============spacing==============*/}
                            <div className="pd_top_80" />
                            {/*===============spacing==============*/}
                            <div className="project_all filt_style_one filter_enabled">
                                <PortfolioFilter3Col articles={articles} filters={content.contentTypes} />
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}
