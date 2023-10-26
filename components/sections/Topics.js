import Link from "next/link"
import Image from "next/image"
import Fade from 'react-reveal/Fade';

export default function Topics({title, before_title, subtitle, topics=[]}) {
    const keyTopics = topics.filter(t => t.featured)
    return (
        <>
            <section className="service-section-two bg-one section-default">
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
                                                        <div className="service_content bg-white rounded-sm">
                                                            <div className="content_inner">
                                                                {
                                                                    topic.icon?.data?.attributes && (
                                                                        <div className="icon-topic">
                                                                            <Image
                                                                              src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${topic.icon.data.attributes.url}`}
                                                                              width={40}
                                                                              height={40}
                                                                              alt={`${topic.name} icon`}
                                                                            />
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
            </section>

        </>
    )
}
