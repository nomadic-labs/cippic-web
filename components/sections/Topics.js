import Link from "next/link"
import Image from "next/image"
import Fade from 'react-reveal/Fade';

export default function Topics({title, before_title, subtitle, topics=[]}) {
    const keyTopics = topics.filter(t => t.featured)
    return (
        <>
            <section className="service-section-two bg-one">
                {/*===============spacing==============*/}
                <div className="pd_top_80" />
                {/*===============spacing==============*/}
                <div className="container-xl">
                    <div className="row">
                        <div className="col-lg-12">
                                <div className="title_sections">
                                    <h2 className="title-small">{title}</h2>
                                </div>
                                <div className="topics">
                                    {keyTopics.map((topic, index) => {
                                        return(
                                            <Fade bottom delay={index * 60} key={topic.id}>
                                                <div>
                                                    <Link className="service_box" href={`/topics/${topic.slug}`}>
                                                        <div className="service_content bg-highlight">
                                                            <div className="content_inner">
                                                                {
                                                                    topic.icon?.data?.attributes && (
                                                                        <div className="icon-topic">
                                                                            <Image
                                                                              src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${topic.icon.data.attributes.url}`}
                                                                              width={30}
                                                                              height={30}
                                                                              alt={`${topic.name} icon`}
                                                                            />
                                                                            <i />
                                                                        </div>
                                                                    )
                                                                }
                                                                <p className="">{topic.name}</p >
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </Fade>
                                        )
                                    })}
                                </div>
                        </div>
                    </div>
                </div>
                {/*===============spacing==============*/}
                <div className="pd_bottom_50" />
                {/*===============spacing==============*/}
            </section>

        </>
    )
}
