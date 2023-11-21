import Layout from "@/components/layout/Layout"
import ContentCard from "@/components/elements/ContentCard"
import ButtonLink from "@/components/elements/ButtonLink"
import FancyHeader from "@/components/sections/FancyHeader"

import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import getLayoutData from "@/utils/layout-data"
const qs = require('qs');


export const getStaticProps = async ({locale}) => {
    const layout = await getLayoutData(locale)

    const pageQuery = qs.stringify(
      {
        locale,
        populate: [
          '*',
          'donation_sections',
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

    return { 
        props: { content, layout },
        revalidate: process.env.NEXT_PUBLIC_PREVIEW_MODE ? '10' : false 
    }
}

export default function Donate({ content, layout }) {

    return (
        <>
            <Layout 
                layout={layout.layout}
                translation={layout.translation}
                topics={layout.categories} 
                contentTypes={layout.contentTypes}
            >
                <FancyHeader
                    title={content.title}
                    subtitle={content.subtitle}
                >
                    <div className="program-cards mr_top_40">
                        { content.donation_sections.map(section => {
                            return (
                                <div className="program-card" key={section.section_id}>
                                    <ContentCard>
                                        <h3 className="mt-0">{section.heading}</h3>
                                        <a href={`#${section.section_id}`} className="read_more">More information <i className="icon-right-arrow" /></a >
                                    </ContentCard>
                                </div>
                            )
                        })}
                    </div>
                </FancyHeader>

                    {
                        content.donation_sections.map(section => {
                            return (
                                <section id={section.section_id} key={section.section_id} className={`bg-${section.background_colour}`}>
                                    <div className="container section-default">
                                        <div className="row">
                                            <div className="col-12 col-lg-8 mx-auto">
                                                <div className="contnet">
                                                    <h2 className="mt-0">{section.heading}</h2>
                                                    <ReactMarkdown>
                                                        {section.body}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )
                        })
                    }

                    <section className="section-default bg-two">
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
                                <div className="col-12">
                                    <div className="program-cards">
                                    { content.how_to_donate.map(card => {
                                        return (
                                            <div className="program-card">
                                                <ContentCard icon={card.icon_class} tags={card.tag}>
                                                    <div>
                                                        <h3 className="mt-0">{card.title}</h3>
                                                        <p>{card.description}</p>
                                                    </div>
                                                    <a href={card.url} className="read_more">{card.link_text} <i className="icon-right-arrow" /></a >
                                                </ContentCard>
                                            </div>
                                        )
                                    })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

            </Layout>
        </>
    )

}