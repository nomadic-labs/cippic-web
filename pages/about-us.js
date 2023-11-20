import Layout from "@/components/layout/Layout"
import ContentCard from "@/components/elements/ContentCard"
import ButtonLink from "@/components/elements/ButtonLink"
import FancyHeader from "@/components/sections/FancyHeader"
import ProfileCard from "@/components/elements/ProfileCard"

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
            'team_members',
            'team_members.photo',
            'team_members.photo.media',
        ]
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    
    const pageRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/about-page?${pageQuery}`)
    const page = await pageRes.json()

    return { props: { content: page.data.attributes, layout } }
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
                />
                    
                    <section className="contact-section section-default">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="title-section">
                                        <h2 className="underline mt-0">{content.team_section_title}</h2>
                                        <ReactMarkdown>{content.team_section_subtitle}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                            { content.team_members.map(tm => {
                                return (
                                    <div key={tm.id} className="col-12 mb-4">
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