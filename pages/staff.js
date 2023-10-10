import Layout from "@/components/layout/Layout"
import ProfileCard from "@/components/elements/ProfileCard"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
const qs = require('qs');


export const getStaticProps = async () => {

    const pageQuery = qs.stringify(
      {
        populate: [
            '*',
            'team_members',
            'team_members.photo',
            'team_members.photo.media',
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

    
    const pageRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/staff-page?${pageQuery}`)
    const page = await pageRes.json()

    const orgRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/organization-information?${orgQuery}`)
    const orgInfo = await orgRes.json()

    const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/categories?${categoriesQuery}`)
    const categoriesJson = await categoriesRes.json()
    const categories = categoriesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const contentTypesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/content-types?${categoriesQuery}`)
    const contentTypesJson = await contentTypesRes.json()
    const contentTypes = contentTypesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const content = { ...page.data.attributes, contact: { ...orgInfo.data.attributes }, categories, contentTypes }

    return { props: { content } }
}

export default function Contact({ content }) {
    const {contact, categories} = content
    console.log({content})

    return (
        <>
            <Layout contact={contact} topics={categories} contentTypes={content.contentTypes}>
                <section className="contact-section">
                    {/*===============spacing==============*/}
                    <div className="pd_top_90" />
                    {/*===============spacing==============*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="title_sections">
                                    <div className="title-small text-dark">{content.page_before_title}</div>
                                    <h1>{content.page_title}</h1>
                                    <p>{content.page_description}</p>
                                </div>
                            </div>
                        </div>

                        {/*===============spacing==============*/}
                        <div className="pd_top_40" />
                        {/*===============spacing==============*/}

                        <div className="row">
                        { content.team_members.map(tm => {
                            return (
                                <div key={tm.id} className="col-xl-6 col-lg-6 col-12">
                                    <ProfileCard profile={tm} />
                                </div>
                            )
                        })}
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )

}