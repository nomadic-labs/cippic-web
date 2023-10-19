import Layout from "@/components/layout/Layout"
import ContentCard from "@/components/elements/ContentCard"
import ButtonLink from "@/components/elements/ButtonLink"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
const qs = require('qs');


export const getStaticProps = async () => {

    const pageQuery = qs.stringify(
      {
        populate: [
          '*',
          'main_image.media',
          'donate_button',
          'how_to_donate'
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

    
    const pageRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/donate-page?${pageQuery}`)
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

export default function Donate({ content }) {
    const {contact, categories} = content
    console.log({content})
    return (
        <>
            <Layout contact={contact} topics={categories} contentTypes={content.contentTypes}>
                    <section className="blog-section position-relative bg-two">
                      {/*===============spacing==============*/}
                      <div className="pd_top_60" />
                      {/*===============spacing==============*/}
                      <div className="container">
                        <div className="row">
                          <div className="col-12">
                            <div className="padding-xl bg-one rounded-lg">
                              <div className="title-small">{content.before_title}</div>
                              <h1>{content.title}</h1>
                              <ReactMarkdown className="text-lg">{content.intro}</ReactMarkdown>
                              <div className="pd_top_20" />
                              <ButtonLink href={content.donate_button.button_link} target="_blank">{content.donate_button.button_text}</ButtonLink>
                            </div>
                          </div>
                        </div>
                      </div>
                        {/*===============spacing==============*/}
                      <div className="pd_top_60" />
                      {/*===============spacing==============*/}
                    </section>
                    <section className="contact-section bg-one">
                        <div className="pd_top_60" />
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                        <div className="content">
                                            <h2>{content.instructions_title}</h2>
                                            <ReactMarkdown>{content.instructions_description}</ReactMarkdown>
                                        </div>
                                </div>
                            </div>
                            <div className="pd_top_20" />
                            <div className="row">
                                { content.how_to_donate.map(card => {
                                    return (
                                        <div className="col-12 col-sm-6 col-md-3">
                                            <ContentCard icon={card.icon_class} tags={card.tag}>
                                                <h3 className="title">{card.title}</h3>
                                                <p>{card.description}</p>
                                                <a href={card.url} className="read_more">{card.link_text} <i className="icon-right-arrow" /></a >
                                            </ContentCard>
                                        </div>
                                    )
                                })}

                                
                            </div>
                        </div>
                        <div className="pd_top_60" />
                    </section>
                    <section className="contact-section">
                        <div className="pd_top_60" />
                        <div className="container-reading">
                            <div className="row">
                                <div className="col-12">
                                        <div className="contnet">
                                            <h2>{content.individual_section_title}</h2>
                                            <ReactMarkdown>
                                                {content.individual_section_description}
                                            </ReactMarkdown>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                        <div className="contnet">
                                            <h2>{content.corporate_section_title}</h2>
                                            <ReactMarkdown>
                                                {content.corporate_section_description}
                                            </ReactMarkdown>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                        <div className="contnet">
                                            <h2>{content.tax_section_title}</h2>
                                            <ReactMarkdown>
                                                {content.tax_section_description}
                                            </ReactMarkdown>
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                        <div className="contnet">
                                            <h2>{content.contacts_section_title}</h2>
                                            <ReactMarkdown>
                                                {content.contacts_section_description}
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