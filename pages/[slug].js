import Layout from "@/components/layout/Layout"
import Link from "next/link"
import Image from "next/image"
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import getLayoutData from "@/utils/layout-data"
import Fade from 'react-reveal/Fade';
import ArticleCard from "@/components/elements/ArticleCard"
import Header from "@/components/sections/Header"
import { useState } from 'react'
import { useRouter } from 'next/router'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";


const dynamicContentDict = {
  "common.faq-section": dynamic(() => import('@/components/sections/FaqSection')),
  "common.highlight-section": dynamic(() => import('@/components/sections/HighlightBox')),
  "common.image-slider": dynamic(() => import('@/components/sections/ImageSliderSection')),
  "common.page-section-navigation": dynamic(() => import('@/components/sections/PageNavigation')),
  "common.paragraph-text-section": dynamic(() => import('@/components/sections/RichTextSection')),
  "common.team-section": dynamic(() => import('@/components/sections/TeamSection')),
  "common.text-with-image-lightbox": dynamic(() => import('@/components/sections/TextWithImages')),
  "common.contact-options": dynamic(() => import('@/components/sections/ContactOptions'))
}

const qs = require('qs');

async function fetchAllPages(pages, pagination) {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/pages?${query}`)
    const { data, meta } = await res.json()
    const accumulator = pages.concat(data)

    if (meta.pagination.page < meta.pagination.pageCount) {
      return await fetchAllPages(accumulator, meta.pagination)
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

  const allPages = await fetchAllPages([], {page: 0})

  const paths = allPages.map((page) => {
    return { params: { slug: page.attributes.slug }, locale: page.attributes.locale }
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
          main_image: true,
          more_images: true,
          localizations: true,
          page_sections: {
            on: {
              "common.highlight-section": { populate: '*' },
              "common.image-slider": { populate: '*' },
              "common.page-section-navigation": { populate: '*' },
              "common.paragraph-text-section": { populate: '*' },
              "common.team-section": { 
                populate: [
                  'team_members.photo'
                ]
              },
              "common.text-with-image-lightbox": { populate: '*' },
              "common.contact-options": { populate: '*' }
            }
          }
        },
        publicationState: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 'preview' : 'live'
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );


    const pageRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/pages?${pageQuery}`)
    const pageJson = await pageRes.json()
    const pageData = pageJson.data[0]

    if (!pageData) {
      return {
        redirect: {
          destination: "/",
        },
      }
    }

    const page = { id: pageData.id, ...pageData.attributes }

    const content = { page }

    return { 
      props: { content, layout },
      revalidate: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 10 : false
    }
}

export default function PageTemplate({ content, layout }) {
    const { page } = content;
    const [openLightbox, setOpenLightbox] = useState(false);
    const { locale } = useRouter()
    const terms = layout.translation
    const headerBg = page.header_background_colour || "dark" 

    let lightboxImages = [];
    let mainImage;
    let moreImages = [];

    if (page.main_image?.data) {
      mainImage = {
        ...page.main_image.data.attributes,
        thumbnail: page.main_image.data.attributes.formats.medium,
        src: `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${page.main_image.data.attributes.url}`, 
        alt: page.main_image.data.attributes.alternativeText,
        description: page.main_image.data.attributes.caption
      }
      lightboxImages = lightboxImages.concat(mainImage)
    }

    if (page.more_images?.data) {
      moreImages = page.more_images.data.map(img => { 
        return {
          ...img.attributes,
          thumbnail: img.attributes.formats.thumbnail,
          src: `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${img.attributes.url}`, 
          alt: img.attributes.alternativeText,
          description: img.attributes.caption
        }
      })
      lightboxImages = lightboxImages.concat(moreImages)
    }

    let localizations;
    if (page.localizations?.data && page.localizations?.data.length > 0) {
      localizations = page.localizations.data.map(l => {
        return ({
          ...l.attributes,
          link: `${l.attributes.locale}/${l.attributes.slug}`
        })
      })
    }

    let seo = {
      title: page.title,
      description: page.subtitle,
      type: "website",
    }

    if (mainImage) {
      seo.image = `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${mainImage.url}`
    }

    if (page.SEO) {
      seo = { ...seo, ...page.SEO }
    }

    const dynamicSections = page.page_sections.map((section, index) => {
      const DynamicComponent = dynamicContentDict[section.__component];
      if (!DynamicComponent) return null

      return {
        component: DynamicComponent,
        props: section
      }
    })

    return (
        <>
            <Layout {...layout} localizations={localizations} seo={seo} title={page.title}>
              <main id="main" className="site-main" role="main">
                <Header className={`bg-${headerBg}`}>
                  <div className="title_sections">
                    <h1 className="title underline mt-0 mb-4">{page.title}</h1>
                  </div>
                  { page.subtitle && <p className="text-lg mb-4">{page.subtitle}</p> }
                </Header>

                {( mainImage || page.body) && 
                <section className="section-default">
                    <div className="container">
                        <div className="row">
                          { mainImage &&
                            <div className="col-12 col-md-4 mx-auto order-md-2 mr_bottom_20">
                              <button aria-label="toggle image viewer" onClick={() => setOpenLightbox(true)} className="btn btn-clear p-0">
                              <Image 
                                  width={mainImage.thumbnail.width} 
                                  height={mainImage.thumbnail.height} 
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${mainImage.thumbnail.url}`} 
                                  alt={mainImage.alternativeText} 
                                  className="mr_bottom_10 img-fluid img-full highlight-shadow" 
                              />
                              <p className="text-sm mr_bottom_10">{mainImage.caption}</p>
                              <div className="thumbnails">
                              {
                                moreImages.map(img => {
                                  return (
                                    <Image 
                                      key={img.thumbnail.url}
                                      width={40} 
                                      height={40} 
                                      src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${img.thumbnail.url}`} 
                                      alt={img.alternativeText} 
                                      className="img-fluid img-full" 
                                    />
                                  )
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
                          {
                            page.body && 
                            <div className={`col-12 ${mainImage ? 'col-md-8' : ''} order-md-1`}>
                                <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                                    {page.body}
                                </ReactMarkdown>
                            </div>
                          }
                        </div>
                    </div>
                </section>
                }

                {dynamicSections.map((section, index) => {
                  const DynamicComponent = section.component
                  return <DynamicComponent {...section.props} key={`dynamic-component-${index}`} />
                })}

              </main>
            </Layout>
        </>
    )
}
