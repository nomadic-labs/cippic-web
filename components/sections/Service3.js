import Link from "next/link"
import Image from "next/image"
export default function Service3({title, before_title, subtitle, topics=[]}) {
    const keyTopics = topics.filter(t => t.featured)
    return (
        <>
            <section className="service-section-two bg_light_1">
                {/*===============spacing==============*/}
                <div className="pd_top_80" />
                {/*===============spacing==============*/}
                <div className="container pd_zero">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title_all_box style_one text-center  dark_color">
                                <div className="title_sections">
                                    <div className="before_title">{before_title} </div>
                                    <h2>{title}</h2>
                                </div>
                            </div>
                        </div>
                        {/*===============spacing==============*/}
                        <div className="mr_bottom_70" />
                        {/*===============spacing==============*/}
                    </div>
                    <div className="row gutter_15px">
                        {keyTopics.map(topic => {
                            return(
                                <div key={topic.id} className="col-xl-3 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div className="service_box style_three dark_color">
                                        <div className="service_content">
                                            <div className="content_inner">
                                                {
                                                    topic.icon?.data?.attributes && (
                                                        <span className="icon-topic">
                                                            <Image
                                                              src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${topic.icon.data.attributes.url}`}
                                                              width={50}
                                                              height={50}
                                                              alt={`${topic.name} icon`}
                                                              style={{objectFit: "contain", height: "50px"}}
                                                            />
                                                            <i />
                                                        </span>
                                                    )
                                                }
                                                <h2><Link href={`/topics/${topic.slug}`}>{topic.name}</Link ></h2>
                                                <p>{topic.description}</p>
                                                <Link href={`/topics/${topic.slug}`} className="read_more">Read more <i className="icon-right-arrow" /></Link >
                                            </div>
                                        </div>
                                    </div>
                                    {/*===============spacing==============*/}
                                    <div className="mr_bottom_40" />
                                    {/*===============spacing==============*/}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/*===============spacing==============*/}
                <div className="pd_bottom_50" />
                {/*===============spacing==============*/}
            </section>

        </>
    )
}
