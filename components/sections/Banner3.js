import Link from "next/link"

export default function Banner3({headline}) {
    return (
        <section className="slider slider_version_v2 style_four nav_position_one">
            <div className="slide-item-content content_center">
                <div className="image-layer" style={{ backgroundImage: 'url(/assets/images/about-bg.jpg)' }}>
                </div>
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <div className="slider_content">
                                <h1 className="animated _fadeInDownBig">
                                    {headline}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
