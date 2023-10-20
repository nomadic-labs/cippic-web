import Link from "next/link"
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown'
import ArticleCard from "@/components/elements/ArticleCard"

export default function FeaturedArticles({ title="Key Insights", articles=[] }) {
    return (
        <div className="blog_post_section one_column news_wrapper_grid style_five">
            <div className="featured-articles">
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
            <div className="pd_top_20" />
            <Link href={`/articles`} className="read_more">Explore the issues <i className="icon-right-arrow" /></Link >
        </div>
    )
}
