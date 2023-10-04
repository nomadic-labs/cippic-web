import Link from "next/link"
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown'
import ArticleCard from "@/components/elements/ArticleCard"

export default function FeaturedArticles({ title="Key Insights", articles=[] }) {
    return (
        <>
            <div className="">
                <div className="title_all_box style_one dark_color">
                    <div className="title_sections left">
                        <h2 className="before_title">{title}</h2>
                    </div>
                </div>
                <div className="blog_post_section one_column news_wrapper_grid style_five">
                    <div className="grid_show_case grid_layout clearfix row">
                        {
                            articles.map((article, index) => {
                                return (
                                    <Fade bottom delay={index * 60} key={article.id}>
                                        <ArticleCard 
                                            article={article} 
                                            showImage={false}
                                            showTeaser={false}
                                            showDate={false}
                                        />
                                    </Fade>
                                )
                            })
                        }
                    </div>
                    <Link href={`/articles`} className="read_more">Explore the issues <i className="icon-right-arrow" /></Link >
                </div>
            </div>
        </>
    )
}
