import Link from "next/link"
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown'
import ArticleCard from "@/components/elements/ArticleCard"

export default function FeaturedArticles({ title="Key Insights", articles=[] }) {
    return (
        <div className="featured-articles">
            {
                articles.map((article, index) => {
                    return (
                        <ArticleCard 
                            order={index}
                            key={article.id}
                            article={article} 
                            showTeaser
                            showDate
                            showTags
                            showLink
                        />
                    )
                })
            }
        </div>
    )
}
