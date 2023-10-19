import Layout from "@/components/layout/Layout"
import ContentCard from "@/components/elements/ContentCard"
import ButtonLink from "@/components/elements/ButtonLink"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import ImageSlider from "@/components/elements/ImageSlider"
const qs = require('qs');

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/student-pages`)
  const { data, meta } = await res.json()
  const paths = data.map((page) => ({
    params: { slug: page.attributes.slug },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
    const { slug } = params;

    const pageQuery = qs.stringify(
      {
        filters: {
            slug: {
              $eq: `${slug}`,
            },
        },
        populate: [
          '*',
          'main_image.media',
          'images.media',
          'cta_button',
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const orgQuery = qs.stringify(
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
          '*',
          'icon.media'
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const pageRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/student-pages?${pageQuery}`)
    const pageJson = await pageRes.json()
    const pageData = pageJson.data[0]
    const page = { id: pageData.id, ...pageData.attributes }

    const orgRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/organization-information?${orgQuery}`)
    const orgInfo = await orgRes.json()

    const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/categories?${categoriesQuery}`)
    const categoriesJson = await categoriesRes.json()
    const categories = categoriesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const contentTypesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/content-types?${categoriesQuery}`)
    const contentTypesJson = await contentTypesRes.json()
    const contentTypes = contentTypesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const studentPagesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/student-pages?sort=title`)
    const studentPagesJson = await studentPagesRes.json()
    const studentPages = studentPagesJson.data.map(t => ({ id: t.id, ...t.attributes}))


    const content = { page, contact: { ...orgInfo.data.attributes }, categories, contentTypes, studentPages }

    return { props: { content } }
}


export default function StudentPage({ content }) {
    const {contact, categories, contentTypes, studentPages, page} = content
    console.log({content})
    const imagesArr = page.images?.data ? page.images.data.map(i => i.attributes) : []
    return (
        <>
            <Layout contact={contact} topics={categories} contentTypes={contentTypes} studentPages={studentPages}>
                    <section className="blog-section position-relative bg-two">
                      {/*===============spacing==============*/}
                      <div className="pd_top_60" />
                      {/*===============spacing==============*/}
                      <div className="container">
                        <div className="row">
                          <div className="col-12">
                            <div className="padding-xl bg-one rounded-lg">
                              <div className="title-small">{page.before_title}</div>
                              <h1>{page.title}</h1>
                              <ReactMarkdown className="text-lg">{page.intro}</ReactMarkdown>
                              <div className="pd_top_20" />
                              <ButtonLink href={page.cta_button.button_link}>{page.cta_button.button_text}</ButtonLink>
                            </div>
                          </div>
                        </div>
                      </div>
                        {/*===============spacing==============*/}
                      <div className="pd_top_60" />
                      {/*===============spacing==============*/}
                    </section>
                    
                    <section className="body-section">
                        <div className="pd_top_60" />
                        <div className="container-reading">
                            <div className="row">
                                <div className="col-12">
                                        <div className="content">
                                            <h2>{page.info_section_title}</h2>
                                            <ReactMarkdown>
                                                {page.info_section_description}
                                            </ReactMarkdown>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="pd_top_60" />
                    </section>

                    {(imagesArr.length > 0) &&
                    <section className="bg-two">
                        <div className="pd_top_20" />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 padding-lg">
                                    <ImageSlider images={imagesArr} slidesPerView={2} />
                                </div>
                            </div>
                        </div>
                        <div className="pd_top_20" />
                    </section>}

                    <section id="apply" className="body-section">
                        <div className="pd_top_60" />
                        <div className="container-reading">
                            <div className="row">
                                <div className="col-12">
                                        <div className="content">
                                            <h2>{page.apply_section_title}</h2>
                                            <ReactMarkdown>
                                                {page.apply_section_description}
                                            </ReactMarkdown>
                                        </div>
                                </div>
                            </div>

                        </div>
                        {/*===============spacing==============*/}
                        <div className="pd_top_60" />
                        {/*===============spacing==============*/}
                    </section>
            </Layout>
        </>
    )

}