import Layout from "@/components/layout/Layout"
import ProfileCard from "@/components/elements/ProfileCard"
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
            'team_members',
            'team_members.photo',
            'team_members.photo.media',
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const pageRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/staff-page?${pageQuery}`)
    const page = await pageRes.json()

    const content = { ...page.data.attributes }

    return { props: { content, layout } }
}

export default function Contact({ content, layout }) {

    return (
        <Layout 
          contact={layout.contact} 
          topics={layout.categories} 
          contentTypes={layout.contentTypes}
          studentPages={layout.studentPages}
        >
            <section className="contact-section">
                {/*===============spacing==============*/}
                <div className="pd_top_80" />
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
                <div className="pd_top_80" />
            </section>
        </Layout>
    )

}