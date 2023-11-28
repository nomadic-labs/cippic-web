import Layout from "@/components/layout/Layout"
import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from 'react-markdown'
import getLayoutData from "@/utils/layout-data"
import FaqSection from '@/components/sections/FaqSection';
import RichTextSection from '@/components/sections/RichTextSection';
import HighlightBox from '@/components/sections/HighlightBox';
import ImageSliderSection from '@/components/sections/ImageSliderSection';
import PageNavigation from '@/components/sections/PageNavigation';
import TeamSection from '@/components/sections/TeamSection';
import TextWithImages from '@/components/sections/TextWithImages';
import ContactOptions from '@/components/sections/ContactOptions';
import Fade from 'react-reveal/Fade';
import ArticleCard from "@/components/elements/ArticleCard"
import Header from "@/components/sections/Header"
import { useContext, useState } from 'react'
import { TranslationContext } from '@/contexts/TranslationContext'
import { useRouter } from 'next/router'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";


const dynamicContentDict = {
  "common.faq-section": FaqSection,
  "common.highlight-section": HighlightBox,
  "common.image-slider": ImageSliderSection,
  "common.page-section-navigation": PageNavigation,
  "common.paragraph-text-section": RichTextSection,
  "common.team-section": TeamSection,
  "common.text-with-image-lightbox": TextWithImages,
  "common.contact-options": ContactOptions
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

    let lightboxImages = [];
    let mainImage;
    let moreImages = [];

    if (page.main_image?.data) {
      mainImage = {
        ...page.main_image.data.attributes,
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
          src: `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${img.attributes.url}`, 
          alt: img.attributes.alternativeText,
          description: img.attributes.caption
        }
      })
      lightboxImages = lightboxImages.concat(moreImages)
    }
    
    const terms = useContext(TranslationContext)
    const headerBg = page.header_background_colour || "dark"

    return (
        <>
            <Layout 
                layout={layout.layout}
                translation={layout.translation}
                topics={layout.categories} 
                contentTypes={layout.contentTypes}
            >
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
                            <div className="col-12 col-lg-4 mx-auto order-lg-2 mr_bottom_40">
                              <button aria-label="toggle image viewer" onClick={() => setOpenLightbox(true)} className="btn btn-clear p-0">
                              <Image 
                                  width={mainImage.width} 
                                  height={mainImage.height} 
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${mainImage.url}`} 
                                  alt={mainImage.alternativeText} 
                                  className="mr_bottom_10 img-fluid img-full highlight-shadow" 
                              />
                              <p className="text-sm mr_bottom_10">{mainImage.caption}</p>
                              <div className="thumbnails">
                              {
                                moreImages.map(img => {
                                  return (<Image 
                                      key={img.url}
                                      width={40} 
                                      height={40} 
                                      src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${img.url}`} 
                                      alt={img.alternativeText} 
                                      className="img-fluid img-full" 
                                  />)
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
                            <div className="col-12   order-lg-1">
                                <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                                    {page.body}
                                </ReactMarkdown>
                            </div>
                          }
                        </div>
                    </div>
                </section>
                }

                {page.page_sections.map((section, index) => {
                  const Component = dynamicContentDict[section.__component];
                  if (!Component) return null
                  return(
                    <Component key={`dynamic-section-${index}`} {...section} />
                  )
                })}


              </main>
            </Layout>
        </>
    )
}