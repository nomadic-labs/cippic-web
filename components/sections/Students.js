import Link from "next/link"
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown'
import ImageSlider from "@/components/elements/ImageSlider"

export default function Students({title, description, images, programs=[]}) {
    const imagesArr = images.data ? images.data.map(i => i.attributes) : []

    return (
        <>
            <section className="service-section bg-light section-default">
                <div className="container-xl">
                    <div className="row students-section">
                        <div className="col-12 col-lg-6">
                            <div className="title_all_box style_one">
                                <div className="title-section">
                                    <h2 className="underline m-0">{title}</h2>
                                </div>
                            </div>
                            <ReactMarkdown>{description}</ReactMarkdown>
                            <Fade bottom cascade delay={200}>
                                <ul className="list-unstyled mr_top_20">
                                    {
                                        programs.map(program => {
                                            return (
                                                <li key={program.link_path} className="">
                                                    <Link href={program.link_path}>
                                                        <i className={`mr_right_10 ${program.icon_class || "fa-solid fa-star"}`} />
                                                        {program.link_text}
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </Fade>
                        </div>
                        <div className="col-12 col-lg-6">
                            <ImageSlider images={imagesArr} />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
