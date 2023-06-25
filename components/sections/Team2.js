import Link from "next/link"
export default function Team2({before_title, title, team_members}) {
    return (
        <>
            <section className="team-section">
                {/*===============spacing==============*/}
                <div className="pd_top_80" />
                {/*===============spacing==============*/}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title_all_box style_one text-center dark_color">
                                <div className="title_sections">
                                    <div className="before_title">{before_title}</div>
                                    <h2>{title}</h2>
                                </div>
                            </div>
                            {/*===============spacing==============*/}
                            <div className="pd_bottom_20" />
                            {/*===============spacing==============*/}
                        </div>
                    </div>
                    <div className="row">
                        {
                            team_members.map(item => {
                                return (
                                    <div key={item.id} className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                                        <div className="team_box style_one">
                                            <div className="team_box_outer">
                                                <div className="member_image">
                                                    <img src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${item.photo.data.attributes.url}`} alt="team image" />
                                                </div>
                                                <div className="about_member">
                                                    <div className="share_media">
                                                        <ul className="first">
                                                            <li className="text">Follow</li>
                                                            <li><i className="fa fa-share-alt" /></li>
                                                        </ul>
                                                        <ul>
                                                            <li className="shar_alt"><i className="fa fa-share-alt" /></li>
                                                            { item.website && <li><a href={item.website}> <i className="fa fa-external-link"> </i> </a></li>}
                                                            { item.twitter && <li><a href={item.twitter}> <i className="fa fa-twitter"> </i> </a></li>}
                                                            { item.linkedin && <li><a href={item.linkedin}> <i className="fa fa-linkedin"> </i> </a></li> }
                                                        </ul>
                                                    </div>
                                                    <div className="authour_details">
                                                        <span>{item.title}</span>
                                                        <h6>{item.name}</h6>
                                                        <div className="button_view">
                                                            <p className="text-white">{item.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*===============spacing==============*/}
                                        <div className="mr_bottom_20" />
                                        {/*===============spacing==============*/}
                                    </div>
                                )
                            })
                        }
        
                    </div>
                </div>
                {/*===============spacing==============*/}
                <div className="pd_bottom_80" />
                {/*===============spacing==============*/}
            </section>

        </>
    )
}
