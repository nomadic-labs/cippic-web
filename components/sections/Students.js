import Link from "next/link"
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown'
import ImageSlider from "@/components/elements/ImageSlider"

export default function Students({title, before_title, subtitle, description, images, links=[]}) {
    const imagesArr = images.data ? images.data.map(i => i.attributes) : []
    return (
        <>
            <section className="service-section bg-two">
                {/*===============spacing==============*/}
                <div className="pd_top_80" />
                {/*===============spacing==============*/}
                <div className="container-xl">
                    <div className="row">
                        <div className="col-12">
                        </div>
                    </div>
                    <div className="row students-section">
                        <div className="col-12 col-lg-6">
                            <div className="bg-one rounded-lg padding-lg mb-40">
                                <div className="title_all_box style_one">
                                    <div className="title_sections">
                                        <div className="title-small">{before_title} </div>
                                        <h2>{title}</h2>
                                    </div>
                                </div>
                                <ReactMarkdown>{description}</ReactMarkdown>
                                <ul>
                                    {
                                        links.map(link => {
                                            return (
                                                <li key={link.id}><Link href={link.link_path}>{link.link_text}</Link></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <ImageSlider images={imagesArr} />
                        </div>
                    </div>
                </div>
                {/*===============spacing==============*/}
                <div className="pd_bottom_80" />
                {/*===============spacing==============*/}
            </section>

        </>
    )
}
