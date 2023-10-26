import Layout from "@/components/layout/Layout"
import ContentCard from "@/components/elements/ContentCard"
import ButtonLink from "@/components/elements/ButtonLink"
import FancyHeader from "@/components/sections/FancyHeader"

import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import getLayoutData from "@/utils/layout-data"
const qs = require('qs');


export const getStaticProps = async () => {
    const layout = await getLayoutData()

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
    
    const pageRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/donate-page?${pageQuery}`)
    const page = await pageRes.json()

    const content = { ...page.data.attributes }

    return { props: { content, layout } }
}

export default function Donate({ content, layout }) {

    return (
        <>
            <Layout 
                contact={layout.contact} 
                topics={layout.categories} 
                contentTypes={layout.contentTypes} 
                studentPages={layout.studentPages}
            >
                <FancyHeader
                    before_title={content.before_title}
                    title={content.title}
                    subtitle={content.intro}
                    button={content.donate_button}
                />
                    
                    <section className="section-default bg-one">
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
                            <div className="row news-articles">
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
                    </section>
                    <section className="section-separator">
                        <div className="container container-reading section-md">
                            <div className="row">
                                <div className="col-12">
                                        <div className="contnet">
                                            <h2 className="mt-0">{content.individual_section_title}</h2>
                                            <ReactMarkdown>
                                                {content.individual_section_description}
                                            </ReactMarkdown>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section-separator">
                        <div className="container container-reading section-md">
                            <div className="row">
                                <div className="col-12">
                                        <div className="contnet">
                                            <h2 className="mt-0">{content.corporate_section_title}</h2>
                                            <ReactMarkdown>
                                                {content.corporate_section_description}
                                            </ReactMarkdown>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section-separator">
                        <div className="container container-reading section-md">
                            <div className="row">
                                <div className="col-12">
                                        <div className="contnet">
                                            <h2 className="mt-0">{content.tax_section_title}</h2>
                                            <ReactMarkdown>
                                                {content.tax_section_description}
                                            </ReactMarkdown>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section-separator">
                        <div className="container container-reading section-md">
                            <div className="row">
                                <div className="col-12">
                                        <div className="contnet">
                                            <h2 className="mt-0">{content.contacts_section_title}</h2>
                                            <ReactMarkdown>
                                                {content.contacts_section_description}
                                            </ReactMarkdown>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </section>

            </Layout>
        </>
    )

}