import Layout from "@/components/layout/Layout"
import Breadcrumb from '@/components/layout/Breadcrumb'
import Link from "next/link"
import Image from "next/image"
import { Autoplay, Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import ReactMarkdown from 'react-markdown'
import getLayoutData from "@/utils/layout-data"

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

    const articleRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${pageQuery}`)
    const articleJson = await articleRes.json()
    const articleData = articleJson.data[0]
    const article = { id: articleData.id, ...articleData.attributes }

    const content = { article }

    return { props: { content, layout } }
}

export default function ArticlePage({ content, layout }) {
    const { article } = content;
    const categories = article.categories.data || []
    const content_types = article.content_types.data || []
    const image = article.main_image?.data?.attributes
    const datePublished = new Date(article.date_published)
    const dateString = datePublished.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
    
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
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <div className="padding-xl bg-one">
                          <div className="title-small">{dateString}</div>
                          <h1 className="title-med">{article.title}</h1>
                          <ReactMarkdown className="text-lg">{`By ${article.author}`}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                    {/*===============spacing==============*/}
                  <div className="pd_top_40" />
                  {/*===============spacing==============*/}
                </section>

                <div className="container container-reading">
                    <div className="row">
                        <div id="primary" className="content-area service col-12">
                            <main id="main" className="site-main" role="main">
                                {/*===============spacing==============*/}
                                <div className="pd_top_60" />
                                {/*===============spacing==============*/}
                                { image &&
                                <Image 
                                  width={image.width} 
                                  height={image.height} 
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${image.url}`} 
                                  alt={image.alternativeText} 
                                  className="img-full img-fluid highlight-shadow mr_bottom_40" 
                                />
                                }
                                <div className="blog_single_details_outer">
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
                                                        { categories.map(cat => <Link key={cat.id} className="btn" href={`/topics/${cat.attributes.slug}`}>{cat.attributes.name}</Link>)}
                                                        { content_types.map(ct => <Link key={ct.id} className="btn" href={`/our-work/${ct.attributes.slug}`}>{ct.attributes.name}</Link>)}
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
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
