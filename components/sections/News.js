import Link from "next/link"
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown'
import ArticleCard from "@/components/elements/ArticleCard"

export default function News({title, before_title, subtitle, articles=[]}) {
    return (
        <>
            <section className="service-section bg-light">
                {/*===============spacing==============*/}
                <div className="pd_top_80" />
                {/*===============spacing==============*/}
                <div className="container-xl">
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
                        <div className="mr_bottom_10" />
                        {/*===============spacing==============*/}
                    </div>
                    <div className="row">
                    {
                            articles.map((article, index) => {
                                const categories = article.categories.data || []
                                const content_types = article.content_types.data || []
                                const datePublished = new Date(article.date_published)
                                const dateString = datePublished.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
                                const tags = categories.map(t => t.attributes.name).join(', ')
                                const image = article.main_image.data ? article.main_image.data.url : null

                                return (
                                    <div key={article.id} className="col-12 col-lg-6 col-xl-4">
                                        <Fade bottom delay={index * 60}>
                                            <ArticleCard article={article} />
                                        </Fade>
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
