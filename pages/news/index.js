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

const blogArticlesQuery = qs.stringify(
  {
    filters: {
        content_types: {
            name: {
              $contains: "News",
          }
        },
    },
    populate: [
      '*',
      'categories',
      'content_types'
    ],
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

export const getStaticProps = async ({ params }) => {

    const postsRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${blogArticlesQuery}`)
    const postsJson = await postsRes.json()
    const posts = postsJson.data

    const contactRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/organization-information?${contactQuery}`)
    const contact = await contactRes.json()

    const content = { posts, contact: { ...contact.data.attributes } }

    return { props: { content } }
}

export default function BlogSimple({ content }) {
    const { posts } = content;
    console.log({posts})
    const categories = []
    const content_types = []
    const mainImage = null
    const imagePath = mainImage ? mainImage.attributes.url : null

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
                                            News
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="breadcrumbs creote text-white text-bold">
                                        <p>The latest news in the world of technology law and policy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auto-container pd_top_60">
                    <div className="row default_row clearfix">
                    {
                        posts.map(post => {
                            const article = post.attributes
                            const categories = article.categories.data || []
                            const datePublished = new Date(article.date_published)
                            const dateString = datePublished.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
                            const tags = categories.map(t => t.attributes.name).join(', ')

                            return (
                                <div key={post.id} className={`project-wrapper grid-item col-xl-4 col-lg-6 col-md-12 col-sm-12`}>
                                    <div className="news_box style_five">
                                        <div className="content_box">
                                            <ul>
                                                <li>
                                                    <Link href={`/articles/${article.slug}`}>{dateString}</Link>
                                                </li>
                                            </ul>
                                            <h2 className="title">
                                                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                                            </h2>
                                            {article.teaser && <p className="short_desc">{article.teaser}</p>}
                                            <p className="tags text-uppercase text-sm">{tags}</p>
                                            <Link href={`/articles/${article.slug}`} className="link__go">Keep reading<i className="icon-right-arrow-long" /></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className="pd_bottom_60" />
                </div>

            </Layout>
        </>
    )
}
