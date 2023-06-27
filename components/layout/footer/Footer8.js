import ReactMarkdown from "react-markdown"
import Link from "next/link"
export default function Footer8({ contact, topics }) {
    const keyTopics = topics.filter(t => t.featured)
    const { main_logo, full_name, description, linkedin, twitter, email, phone, mailing_address, location, license, uottawa_logo } = contact;
    return (
        <>
            <div className="footer_area footer_sticky_enable_foo footer_eight" id="footer_contents">
                {/*===============spacing==============*/}
                <div className="pd_top_80" />
                {/*===============spacing==============*/}
                <div className="footer_widgets_wrap">
                    <div className="auto-container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12">
                                <div className="footer_widgets about_company dark_color">
                                    <div className="about_company_inner">
                                        <div className="footer_logo">
                                            <Link href="/" target="_blank" >
                                                <img src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${main_logo.data.attributes.url}`} alt="logo" />
                                            </Link>
                                        </div>
                                        {/*===============spacing==============*/}
                                        <div className="pd_bottom_40" />
                                        {/*===============spacing==============*/}
                                        <div className="content_box">
                                            <p>{description}</p>
                                        </div>
                                        <div className="footer_logo">
                                            <a href="https://uottawa.ca" target="_blank" >
                                                <img src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${uottawa_logo.data.attributes.url}`} alt="logo" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12">
                                {/*===============spacing==============*/}
                                <div className="pd_top_10" />
                                {/*===============spacing==============*/}
                                <div className="footer_widgets wid_tit style_one">
                                    <div className="fo_wid_title">
                                        <h2 className="color_dark">Top Pages</h2>
                                    </div>
                                </div>
                                {/*===============spacing==============*/}
                                <div className="pd_bottom_20" />
                                {/*===============spacing==============*/}
                                <div className="list_item_box style_one">
                                    <ul>
                                        <li><Link href={`/about-us`}> About us </Link></li>
                                        <li><Link href={`/news`}> News </Link></li>
                                        <li><Link href={`/contact`}> Contact us </Link></li>
                                        <li><Link href={`/donate`}> Donate </Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12">
                                {/*===============spacing==============*/}
                                <div className="pd_top_10" />
                                {/*===============spacing==============*/}
                                <div className="footer_widgets wid_tit style_one">
                                    <div className="fo_wid_title">
                                        <h2 className="color_dark">Key Topics</h2>
                                    </div>
                                </div>
                                {/*===============spacing==============*/}
                                <div className="pd_bottom_20" />
                                {/*===============spacing==============*/}
                                <div className="list_item_box style_one">
                                    <ul>
                                        {
                                            keyTopics.map(topic => <li key={topic.id}><Link href={`/${topic.taxonomy_term_id}`}> {topic.name} </Link></li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                            
                            
                            <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12">
                                {/*===============spacing==============*/}
                                <div className="pd_top_10" />
                                {/*===============spacing==============*/}
                                <div className="footer_widgets wid_tit style_one">
                                    <div className="fo_wid_title">
                                        <h2 className="color_dark">Get In Touch</h2>
                                    </div>
                                </div>
                                {/*===============spacing==============*/}
                                <div className="pd_bottom_20" />
                                {/*===============spacing==============*/}
                                <div className="footer_widgets get_in_touch_foo dark_color">
                                    <div className="get_intouch_inrfo">
                                        <div className="foo_cont_inner">
                                            <div className="top">
                                                <h6 className="color_dark">Location</h6>
                                                <ReactMarkdown className="color_dark">{location}</ReactMarkdown>
                                            </div>
                                            <div className="bottom">
                                                <h6 className="color_dark"> Contact</h6>
                                                <div className="con_content">
                                                    <h5 className="color_dark">{`Phone: `}</h5>
                                                    <Link href={`tel:${phone}`} className="color_dark">{phone}</Link>
                                                </div>
                                                <div className="con_content">
                                                    <h5 className="color_dark">{`Email: `}</h5>
                                                    <Link href={`mailto:${email}`} className="color_dark">{email}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*===============spacing==============*/}
                <div className="pd_bottom_60" />
                {/*===============spacing==============*/}
                <div className="footer-copyright">
                    {/*===============spacing==============*/}
                    <div className="divider_1" />
                    <div className="pd_top_20" />
                    {/*===============spacing==============*/}
                    <div className="auto-container">
                        <div className="row align-items-center">
                            <div className="col-lg-8 col-md-12 mb-3 mb-lg-0 mb-xl-0">
                                <div className="footer_copy_content color_dark">
                                    <ReactMarkdown>{license}</ReactMarkdown>
                                </div>
                                <div className="footer_copy_content color_dark">
                                    <Link href="/privacy">Privacy Policy</Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="footer_copy_content_right text-md-end">
                                    <div className="social_media_v_one style_two">
                                        <ul>
                                            <li>
                                                <a href={linkedin}>
                                                    <span className="fa fa-linkedin" />
                                                    <small>LinkedIn</small>
                                                </a>
                                            </li>
                                            <li>
                                                <a href={twitter}>
                                                    <span className="fa fa-twitter" />
                                                    <small>Twitter</small>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*===============spacing==============*/}
                    <div className="pd_bottom_20" />
                    {/*===============spacing==============*/}
                </div>
            </div>

        </>
    )
}
