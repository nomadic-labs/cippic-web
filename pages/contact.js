import Layout from "@/components/layout/Layout"
import Headline from "@/components/layout/Headline"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
const qs = require('qs');


export const getStaticProps = async () => {

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

    
    const pageRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/contact-page?${pageQuery}`)
    const page = await pageRes.json()

    const orgRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/organization-information?${orgQuery}`)
    const orgInfo = await orgRes.json()

    const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/categories?${categoriesQuery}`)
    const categoriesJson = await categoriesRes.json()
    const categories = categoriesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const content = { ...page.data.attributes, contact: { ...orgInfo.data.attributes }, categories }

    return { props: { content } }
}

export default function Contact({ content }) {
    console.log(content)
    const {contact, categories} = content
    return (
        <>
            <Layout headerStyle={1} footerStyle={8} contact={contact} topics={categories}>
                <Headline headline={content.headline} backgroundImage={content.background_image?.data?.attributes} />
                <div>
                    <section className="contact-section">
                        {/*===============spacing==============*/}
                        <div className="pd_top_90" />
                        {/*===============spacing==============*/}
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="title_all_box style_one dark_color">
                                        <div className="title_sections left">
                                            <div className="before_title">{content.section_before_title}</div>
                                            <h2>{content.section_title}</h2>
                                            <p>{content.section_description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-12">
                                    <div className="contact_box_content style_one mb-4">
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
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-12">
                                    <div className="contact_box_content style_one mb-4">
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
                                    </div>
                                </div>
                                    
                                <div className="col-xl-6 col-lg-6 col-12">
                                    <div className="contact_box_content style_one mb-4">
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
                                    </div>
                                </div>


                                <div className="col-xl-6 col-lg-6 col-12">
                                    <div className="contact_box_content style_one mb-4">
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
                                    </div>
                                </div>
                                    
                                <div className="col-12">
                                    <div className="social_media_v_one style_two">
                                        <ul>
                                            <li>
                                                <Link href="#"> <span className="fa fa-facebook" />
                                                    <small>facebook</small>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#"> <span className="fa fa-twitter" />
                                                    <small>twitter</small>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#"> <span className="fa fa-skype" />
                                                    <small>skype</small>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#"> <span className="fa fa-instagram" />
                                                    <small>instagram</small>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                            </div>
                        </div>
                        {/*===============spacing==============*/}
                        <div className="pd_top_70" />
                        {/*===============spacing==============*/}
                    </section>
                    <section className="contact-map-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <ReactMarkdown>
                                        {content.land_acknowledgement}
                                    </ReactMarkdown>
                                </div>  
                                {/*===============spacing==============*/}
                                <div className="pd_top_40" />
                                {/*===============spacing==============*/}                              
                                <div className="col-lg-12">
                                    <section className="map-section">
                                        {/*Map Outer*/}
                                        <div className="map-outer">
                                            <iframe src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=100%20Thomas%20More%20Private,%20Ottawa,%20ON%20K1N%206N5+(CIPPIC)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" height={570} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                        {/*===============spacing==============*/}
                        <div className="pd_top_90" />
                        {/*===============spacing==============*/}
                    </section>
                </div>

            </Layout>
        </>
    )

}