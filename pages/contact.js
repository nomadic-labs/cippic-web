import Layout from "@/components/layout/Layout"
import ContentCard from "@/components/elements/ContentCard"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import getLayoutData from "@/utils/layout-data"
const qs = require('qs');


export const getStaticProps = async ({ locale }) => {
    const layout = await getLayoutData(locale)

    const pageQuery = qs.stringify(
      {
        locale,
        populate: [
          '*',
          'contact_options'
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    
    const pageRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/contact-page?${pageQuery}`)
    const page = await pageRes.json()

    const content = { ...page.data.attributes }

    return { 
        props: { content, layout },
        revalidate: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 10 : false 
    }
}

export default function Contact({ content, layout }) {
    const { contact } = layout

    return (
        <>
            <Layout 
                layout={layout.layout}
                translation={layout.translation}
                topics={layout.categories} 
                contentTypes={layout.contentTypes}
            >
                <section className="section-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="title-section">
                                    <h1 className="underline mt-0">{content.title}</h1>
                                </div>
                                <ReactMarkdown className="text-lg">{content.subtitle}</ReactMarkdown>
                            </div>
                        </div>

                        <div className="row mr_top_20">

                            {
                                content.contact_options.map(option => {
                                    return(
                                        <div className="col-xl-6 col-lg-6 col-12 mb-4">
                                            <ContentCard noAnimate>
                                                <div className="contact_box_inner icon_yes">
                                                    <div className="icon_bx">
                                                        <span className={`fa-solid ${option.icon_class}`} />
                                                    </div>
                                                    <div className="contnet">
                                                        <h3 className="title-small mt-0"> {option.label} </h3>
                                                        <ReactMarkdown>
                                                            {option.body}
                                                        </ReactMarkdown>
                                                    </div>
                                                </div>
                                            </ContentCard>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </section>

                <section className="contact-section section-default bg-one">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="title-small mb-4 mt-0">{content.land_acknowledgement_heading}</h3>
                                <ReactMarkdown>
                                    {content.land_acknowledgement}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="contact-section section-default bg-two">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="map-outer">
                                    <iframe src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=100%20Thomas%20More%20Private,%20Ottawa,%20ON%20K1N%206N5+(CIPPIC)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" height={570} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                </div>
                            </div>  
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )

}