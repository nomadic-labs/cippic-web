import Link from "next/link"
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown'
import ArticleCard from "@/components/elements/ArticleCard"

export default function News({title, before_title, subtitle, articles=[]}) {
    return (
        <>
            <section className="service-section bg-two section-default">
                <div className="container-xl">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title_all_box style_one text-center dark_color">
                                <div className="title_sections">
                                    <div className="before_title">{before_title} </div>
                                    <h2 className="mt-0 underline">{title}</h2>
                                </div>
                            </div>
                        </div>
                        {/*===============spacing==============*/}
                        <div className="mr_bottom_10" />
                        {/*===============spacing==============*/}
                    </div>
                    <div className="row news-articles">
                    {
                            articles.map((article, index) => {
                                return (
                                    <div key={article.id} className="col-12 col-lg-6 col-xl-4">
                                        <ArticleCard 
                                            article={article} 
                                            showImage
                                            showTeaser
                                            showDate
                                            imageTop
                                            showTags 
                                            showLink
                                            order={index}
                                        />
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </section>

        </>
    )
}
