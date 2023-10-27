import Layout from "@/components/layout/Layout"
import ContentCard from "@/components/elements/ContentCard"
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
          'background_image.media'
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    
    const pageRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/contact-page?${pageQuery}`)
    const page = await pageRes.json()

    const content = { ...page.data.attributes }

    return { props: { content, layout } }
}

export default function Contact({ content, layout }) {
    const { contact } = layout

    return (
        <>
            <Layout 
              contact={layout.contact} 
              topics={layout.categories} 
              contentTypes={layout.contentTypes}
              studentPages={layout.studentPages}
            >
                <section className="contact-section section-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="title-section">
                                    <h1 className="underline">{content.section_title}</h1>
                                    <p className="text-lg">{content.section_description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="row mr_top_20">
                            <div className="col-xl-6 col-lg-6 col-12">
                                <ContentCard noAnimate>
                                    <div className="contact_box_inner icon_yes">
                                        <div className="icon_bx">
                                            <span className="icon-send" />
                                        </div>
                                        <div className="contnet">
                                            <h3 className="title-small mt-0"> {content.email_label} </h3>
                                            <p>
                                                {contact.email}
                                            </p>
                                        </div>
                                    </div>
                                </ContentCard>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-12">
                                <ContentCard noAnimate>
                                    <div className="contact_box_inner icon_yes">
                                        <div className="icon_bx">
                                            <span className="icon-phone-call" />
                                        </div>
                                        <div className="contnet">
                                            <h3 className="title-small mt-0"> {content.phone_number_label} </h3>
                                            <p>
                                                {contact.phone}
                                            </p>
                                        </div>
                                    </div>
                                </ContentCard>
                            </div>
                                
                            <div className="col-xl-6 col-lg-6 col-12">
                                <ContentCard noAnimate>
                                    <div className="contact_box_inner icon_yes">
                                        <div className="icon_bx">
                                            <span className=" icon-placeholder" />
                                        </div>
                                        <div className="contnet">
                                            <h3 className="title-small mt-0"> {content.physical_address_label} </h3>
                                            <ReactMarkdown>
                                                {contact.location}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </ContentCard>
                            </div>


                            <div className="col-xl-6 col-lg-6 col-12">
                                <ContentCard noAnimate>
                                    <div className="contact_box_inner icon_yes">
                                        <div className="icon_bx">
                                            <span className=" icon-mail" />
                                        </div>
                                        <div className="contnet">
                                            <h3 className="title-small mt-0"> {content.mailing_address_label} </h3>
                                            <ReactMarkdown>
                                                {contact.mailing_address}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </ContentCard>
                            </div>
                                

                        </div>
                    </div>
                </section>

                <section className="contact-section section-default bg-one">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="title-small mb-4 mt-0"> Land acknowledgement </h3>
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