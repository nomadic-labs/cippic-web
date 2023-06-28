
import Link from "next/link"
import VideoBox from "../elements/VideoBox"
export default function About4({title, before_title, about_list_items=[], image}) {

    const imageSrc = image ? `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${image.url}` : null
    return (
        <>
            <section className="about-section">
                {/*===============spacing==============*/}
                <div className="pd_top_80" />
                {/*===============spacing==============*/}
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 col-md-12 mb-sm-5 mb-md-5 mb-lg-5 mb-xl-0">
                            <div className="title_all_box style_one dark_color">
                                <div className="title_sections left">
                                    <div className="before_title">{before_title}</div>
                                    <h2 className="title">{title}</h2>
                                    <ul>
                                        {
                                            about_list_items.map(item => {
                                                return <li key={item.id}>{item.description}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-10 col-md-12 d-flex justify-content-center">
                            <div className="image_boxes style_five">
                                
                                <div className="image_box">
                                    {imageSrc && <img src={imageSrc} className="img-fluid" alt="img" />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
