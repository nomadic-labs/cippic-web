import Layout from "@/components/layout/Layout"
import ContentCard from "@/components/elements/ContentCard"
import ButtonLink from "@/components/elements/ButtonLink"
import FancyHeader from "@/components/sections/FancyHeader"
import ProfileCard from "@/components/elements/ProfileCard"

import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import getLayoutData from "@/utils/layout-data"
const qs = require('qs');


export const getStaticProps = async () => {
    const layout = await getLayoutData()

    const staffPageQuery = qs.stringify(
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

    const staffRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/staff-page?${staffPageQuery}`)
    const staffPage = await staffRes.json()

    const contactQuery = qs.stringify(
      {
        populate: '*'
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    
    const contactRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/contact-page?${contactQuery}`)
    const contactPage = await contactRes.json()

    const content = { staff: staffPage.data.attributes, contact: contactPage.data.attributes }

    return { props: { content, layout } }
}

export default function Donate({ content, layout }) {
    const { contact } = layout

    return (
        <>
            <Layout 
                contact={layout.contact} 
                topics={layout.categories} 
                contentTypes={layout.contentTypes} 
                studentPages={layout.studentPages}
            >
                <FancyHeader
                    title={"About Us"}
                    subtitle={"The Samuelson-Glushko Canadian Internet Policy and Public Interest Clinic (CIPPIC) is Canada’s first and only public interest technology law clinic. Based at the University of Ottawa’s Faculty of Law, our team of legal experts and law students works together to advance the public interest on critical law and technology issues."}
                />
                    
                    <section className="contact-section">
                        <div className="container section-default">
                            <div className="row">
                                <div className="col-12">
                                    <div className="title-section">
                                        <h2 className="underline">{content.staff.page_title}</h2>
                                        <p>{content.staff.page_description}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                            { content.staff.team_members.map(tm => {
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