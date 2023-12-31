import Link from "next/link"
import Image from "next/image"

export default function Footer({ layout }) {
    const { twitter, footer_links=[], social_media_links=[], main_logo, uottawa_logo } = layout;
    const cippicLogo = main_logo?.data?.attributes 
    const cltsLogo = uottawa_logo?.data?.attributes 

    return (
        <>
            <div className="footer_area footer_sticky_enable_foo bg-one" id="footer_contents">
                {/*===============spacing==============*/}
                <div className="footer-copyright">
                    {/*===============spacing==============*/}
                    <div className="pd_top_20" />
                    {/*===============spacing==============*/}
                    <div className="container-xl">
                        <div className="row align-items-center pd_bottom_20">
                            <div className="col-12 col-md-8 col-lg-6 mb-3 mb-lg-0 mb-xl-0">
                                <div className="d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
                                {
                                    cippicLogo && 
                                    <div className="cippic-logo">
                                        <Image 
                                            width={main_logo.data.attributes.width} 
                                            height={main_logo.data.attributes.height} 
                                            src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${main_logo.data.attributes.url}`} 
                                            alt={main_logo.data.attributes.alternativeText} 
                                            className="img-fluid cippic-logo" 
                                        />
                                        <strong className="text-bold">{layout.full_organization_name}</strong>
                                    </div>
                                }
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-6">
                                <div className="footer_copy_content_right text-center text-lg-end">
                                    {
                                        cltsLogo &&
                                        <Image 
                                            width={255} 
                                            height={83} 
                                            src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${uottawa_logo.data.attributes.url}`} 
                                            alt={uottawa_logo.data.attributes.alternativeText} 
                                            className="img-fluid uottawa-logo" 
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-12 col-md-8 col-lg-8">
                                <div className="d-flex gap-4 justify-content-center justify-content-md-start mb-3 mb-md-0">
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
                            </div>
                            <div className="col-12 col-md-4 col-lg-4">
                                <div className="footer_copy_content_right text-md-end">
                                    <div className="social_media_v_one">
                                        <ul className="justify-content-center justify-content-md-end">
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
