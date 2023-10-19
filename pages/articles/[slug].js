import Layout from "@/components/layout/Layout"
import Breadcrumb from '@/components/layout/Breadcrumb'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import ReactMarkdown from 'react-markdown'

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

const teamQuery = qs.stringify(
  {
    populate: [
      '*',
      'photo.media'
    ],
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

const categoriesQuery = qs.stringify(
  {
    populate: [
      '*',
      'icon.media'
    ],
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

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
    const articleRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?filters[slug][$eq]=${slug}&populate=*`)
    const articleJson = await articleRes.json()
    const articleData = articleJson.data[0]
    const article = { id: articleData.id, ...articleData.attributes }

    const contactRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/organization-information?${contactQuery}`)
    const contact = await contactRes.json()

    const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/categories?${categoriesQuery}`)
    const categoriesJson = await categoriesRes.json()
    const categories = categoriesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const contentTypesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/content-types?${categoriesQuery}`, {
        method: 'GET',
        headers
    })
    const contentTypesJson = await contentTypesRes.json()
    const contentTypes = contentTypesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const studentPagesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/student-pages?sort=title`, {
        method: 'GET',
        headers
    })
    const studentPagesJson = await studentPagesRes.json()
    const studentPages = studentPagesJson.data.map(t => ({ id: t.id, ...t.attributes}))


    const content = { article, contact: { ...contact.data.attributes }, categories, contentTypes, studentPages }

    return { props: { content } }
}

export default function BlogSimple({ content }) {
    console.log({content})
    const { article } = content;

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

    const categories = article.categories.data || []
    const content_types = article.content_types.data || []
    const mainImage = article.main_image?.data
    const imagePath = mainImage ? mainImage.attributes.url : null
    return (
        <>
            <Layout headerStyle={1} footerStyle={8} contact={content.contact} topics={content.categories} studentPages={content.studentPages}>
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
                                            {article.title}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="breadcrumbs creote text-white text-uppercase text-bold">
                                        <p>{`By ${article.author}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auto-container">
                    <div className="row default_row">
                        <div id="primary" className="content-area service col-12">
                            <main id="main" className="site-main" role="main">
                                {/*===============spacing==============*/}
                                <div className="pd_top_90" />
                                {/*===============spacing==============*/}
                                <section className="blog_single_details_outer">
                                    <div className="single_content_upper">
                                        <ReactMarkdown>
                                            {article.body}
                                        </ReactMarkdown>
                                    </div>
                                    <div className="single_content_lower">
                                        <div className="tags_and_share">
                                            <div className="d-flex">
                                                <div className="tags_content left_one">
                                                    <div className="box_tags_psot">
                                                        <div className="title">Filed under</div>
                                                        { categories.map(cat => <Link key={cat.id} className="btn" href={`/${cat.attributes.slug}`}>{cat.attributes.name}</Link>)}
                                                        { content_types.map(ct => <Link key={ct.id} className="btn" href={`/${ct.attributes.slug}`}>{ct.attributes.name}</Link>)}
                                                    </div>
                                                </div>
                                                {/*<div className="share_content right_one">
                                                    <div className="share_socail">
                                                        <div className="title">Share</div>
                                                        <button className="m_icon" title="facebook" data-sharer="facebook" data-title="blog single" data-url="/">
                                                            <i className="fa fa-facebook" />
                                                        </button>
                                                        <button className="m_icon" title="twitter" data-sharer="twitter" data-title="blog single" data-url="/">
                                                            <i className="fa fa-twitter" />
                                                        </button>
                                                        <button className="m_icon" title="whatsapp" data-sharer="whatsapp" data-title="blog single" data-url="/">
                                                            <i className="fa fa-whatsapp" />
                                                        </button>
                                                        <button className="m_icon" title="telegram" data-sharer="telegram" data-title="blog single" data-url="/" data-to="+44555-03564">
                                                            <i className="fa fa-telegram" />
                                                        </button>
                                                        <button className="m_icon" title="skype" data-sharer="skype" data-url="/" data-title="blog single">
                                                            <i className="fa fa-skype" />
                                                        </button>
                                                    </div>
                                                </div>*/}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                </section>
                                {/*===============spacing==============*/}
                                <div className="pd_bottom_70" />
                                {/*===============spacing==============*/}
                            </main>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}
