import Link from "next/link"
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown'
import ArticleCard from "@/components/elements/ArticleCard"

export default function Articles({title, subtitle, articles=[]}) {
    return (
        <>
            <section className="service-section bg-two section-default">
                <div className="container-xl">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title_all_box style_one text-center dark_color">
                                <div className="title-section">
                                    <h2 className="mt-0 underline">{title}</h2>
                                </div>
                                <ReactMarkdown className="text-lg">{subtitle}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="grid-wrapper">
                            {
                                articles.map((article, index) => {
                                    return (
                                        <div key={article.id} className="grid-item">
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
                    </div>
                </div>
            </section>

        </>
    )
}
