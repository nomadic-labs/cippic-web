import Link from "next/link"
export default function Headline({ headline, backgroundImage }) {
    const imageSrc = backgroundImage ? `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${backgroundImage.url}` : null
    return (
        <>
            <div className={`page_header_default style_one`}>
                <div className="parallax_cover">
                    <div className="simpleParallax">
                        {imageSrc && <img src={imageSrc} alt="bg_image" className="cover-parallax" />}
                    </div>
                </div>
                <div className="page_header_content">
                    <div className="auto-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="banner_title_inner">
                                    <div className="title_page">
                                        {headline}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="breadcrumbs creote">
                                    <ul className="breadcrumb m-auto">
                                        <li><Link href="/">Home</Link></li>
                                        <li className="active">{headline}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
