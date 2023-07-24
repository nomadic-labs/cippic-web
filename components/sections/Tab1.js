import Link from "next/link"
import { useState } from "react"
import ReactMarkdown from 'react-markdown'
import Fade from 'react-reveal/Fade';

export default function Tab1({title, before_title, tabs}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleOnClick = (index) => {
        setActiveIndex(index);
    };
    return (
        <>
            <section className="tab-section bg_op_1">
                {/*===============spacing==============*/}
                <div className="pd_top_100" />
                {/*===============spacing==============*/}
                <div className="container">
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
                    <div className="row">
                        <Fade>
                        <div className="tabs_all_box  tabs_all_box_start type_one">
                            <div className="tab_over_all_box">
                                <div className="tabs_header clearfix">
                                    <ul className="showcase_tabs_btns nav-pills nav   clearfix">
                                        {
                                            tabs.map((tab, index) => {
                                                return (
                                                    <li key={index} className="nav-item mb-0">
                                                        <a className={activeIndex === index ? "s_tab_btn nav-link active" : "s_tab_btn nav-link"} onClick={() => handleOnClick(index)}>
                                                            {tab.title}
                                                        </a >
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <div className="toll_free">
                                        <Link href="/donate"> 
                                            <i className="icon-credit-card" />
                                            Donate now
                                        </Link >
                                    </div>
                                </div>
                                <div className="s_tab_wrapper">
                                    <div className="s_tabs_content">
                                        {
                                            tabs.map((tab, index) => {
                                                return (
                                                <div key={index} className={activeIndex === index ? "s_tab fade active-tab show" : "s_tab fade"}>
                                                    <div className="tab_content one" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${tab.background_image.data.attributes.url})` }}>
                                                        <div className="content_image">
                                                            <h6>{tab.before_title}</h6>
                                                            <h2>{tab.title}</h2>
                                                            <ReactMarkdown>{tab.description}</ReactMarkdown>
                                                            <Link href={tab.link} className="rd_more">{tab.link_text} <i className="icon-right-arrow" /></Link >
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                                            })
                                        }
                
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Fade>
                    </div>
                </div>
                {/*===============spacing==============*/}
                <div className="pd_bottom_90" />
                {/*===============spacing==============*/}
            </section>

        </>
    )
}
