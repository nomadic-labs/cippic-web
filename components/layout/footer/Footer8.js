import ReactMarkdown from "react-markdown"
import Link from "next/link"
export default function Footer8({ layout }) {
    const { twitter, footer_links, social_media_links } = layout;
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
                                {
                                    footer_links.map(link => {
                                        return (
                                        <div key={link.link_path} className="footer_copy_content color_dark">
                                            <Link href={link.link_path}>{link.link_text}</Link>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="footer_copy_content_right text-md-end">
                                    <div className="social_media_v_one">
                                        <ul>
                                            {
                                                social_media_links.map(link => {
                                                    const target = link.target === "new window" ? "_blank" : "_self"
                                                    return (
                                                    <li key={link.link_path}>
                                                        <a href={link.link_path} target={target}>
                                                            <span className={`fa ${link.icon_class}`} />
                                                            <small>{link.link_text}</small>
                                                        </a>
                                                    </li>
                                                    )
                                                })
                                            }
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
