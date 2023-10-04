import Link from "next/link"
import Fade from 'react-reveal/Fade';

export default function LatestNews({ title="Latest News", articles=[] }) {
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
                                const datePublished = new Date(article.date_published)
                                const dateString = datePublished.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
                                return (
                                    <div key={article.id} className="grid_box _card">
                                        <Fade bottom delay={index * 60}>
                                        <div className="news_box style_five">
                                            <div className="content_box">
                                                <ul>
                                                    <li>
                                                        <Link href={`/articles/${article.slug}`}>{dateString}</Link>
                                                    </li>
                                                </ul>
                                                <h2 className="title">
                                                    <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                                                </h2>
                                                { article.teaser && <p className="short_desc">{article.teaser}</p> }
                                            </div>
                                        </div>
                                        </Fade>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Link href={`/blog`} className="read_more">All blog posts <i className="icon-right-arrow" /></Link >

                </div>
            </div>
        </>
    )
}
