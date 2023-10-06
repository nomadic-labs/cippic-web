import ReactMarkdown from "react-markdown"
import Link from "next/link"
export default function Footer8({ contact, topics }) {
    const keyTopics = topics.filter(t => t.featured)
    const { main_logo, full_name, description, linkedin, twitter, email, phone, mailing_address, location, license, uottawa_logo } = contact;
    return (
        <>
            <div className="footer_area footer_sticky_enable_foo bg-one" id="footer_contents">
                {/*===============spacing==============*/}
                <div className="footer-copyright">
                    {/*===============spacing==============*/}
                    <div className="pd_top_20" />
                    {/*===============spacing==============*/}
                    <div className="container-xl">
                        <div className="row align-items-center">
                            <div className="col-lg-8 col-md-12 mb-3 mb-lg-0 mb-xl-0">
                                <div className="footer_copy_content color_dark">
                                    <Link href="/privacy">Privacy Policy</Link>
                                </div>
                                <div className="footer_copy_content color_dark">
                                    <ReactMarkdown>{license}</ReactMarkdown>
                                </div>
                                <div className="footer_copy_content color_dark">
                                    <Link href="https://techlaw.uottawa.ca/">CLTS</Link>
                                </div>
                                <div className="footer_copy_content color_dark">
                                    <Link href="https://www.uottawa.ca/">uOttawa</Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="footer_copy_content_right text-md-end">
                                    <div className="social_media_v_one">
                                        <ul>
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
