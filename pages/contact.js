import Layout from "@/components/layout/Layout"
import Card from "@/components/elements/Card"
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
                <div>
                    <section className="contact-section">
                        {/*===============spacing==============*/}
                        <div className="pd_top_90" />
                        {/*===============spacing==============*/}
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="title_sections">
                                        <div className="title-small text-dark">{content.section_before_title}</div>
                                        <h2>{content.section_title}</h2>
                                        <p>{content.section_description}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-12">
                                    <Card>
                                        <div className="contact_box_inner icon_yes">
                                            <div className="icon_bx">
                                                <span className="icon-send" />
                                            </div>
                                            <div className="contnet">
                                                <h3> {content.email_label} </h3>
                                                <p>
                                                    {contact.email}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-12">
                                    <Card>
                                        <div className="contact_box_inner icon_yes">
                                            <div className="icon_bx">
                                                <span className="icon-phone-call" />
                                            </div>
                                            <div className="contnet">
                                                <h3> {content.phone_number_label} </h3>
                                                <p>
                                                    {contact.phone}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                    
                                <div className="col-xl-6 col-lg-6 col-12">
                                    <Card>
                                        <div className="contact_box_inner icon_yes">
                                            <div className="icon_bx">
                                                <span className=" icon-placeholder" />
                                            </div>
                                            <div className="contnet">
                                                <h3> {content.physical_address_label} </h3>
                                                <ReactMarkdown>
                                                    {contact.location}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    </Card>
                                </div>


                                <div className="col-xl-6 col-lg-6 col-12">
                                    <Card>
                                        <div className="contact_box_inner icon_yes">
                                            <div className="icon_bx">
                                                <span className=" icon-mail" />
                                            </div>
                                            <div className="contnet">
                                                <h3> {content.mailing_address_label} </h3>
                                                <ReactMarkdown>
                                                    {contact.mailing_address}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                    

                            </div>
                        </div>
                        {/*===============spacing==============*/}
                        <div className="pd_top_70" />
                        {/*===============spacing==============*/}
                    </section>
                    <section className="contact-map-section bg-two">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    {/*===============spacing==============*/}
                                    <div className="pd_top_80" />
                                    {/*===============spacing==============*/}   
                                    <div className="bg-faded rounded-lg padding-lg text-white">
                                        <ReactMarkdown>
                                            {content.land_acknowledgement}
                                        </ReactMarkdown>
                                    </div>  
                                    {/*===============spacing==============*/}
                                    <div className="pd_top_40" />
                                    {/*===============spacing==============*/}                              
                                    <div className="map-outer rounded-lg">
                                        <iframe src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=100%20Thomas%20More%20Private,%20Ottawa,%20ON%20K1N%206N5+(CIPPIC)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" height={570} style={{ border: 0, borderRadius: '1rem' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                    </div>
                                </div>  
                            </div>
                        </div>
                        {/*===============spacing==============*/}
                        <div className="pd_top_80" />
                        {/*===============spacing==============*/}
                    </section>
                </div>

            </Layout>
        </>
    )

}