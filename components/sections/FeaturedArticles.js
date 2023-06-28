import Link from "next/link"

export default function FeaturedArticles({ articles=[] }) {
    return (
        <>
            <section className="blog-section position-relative mr_top_minus_90 z_99">
                <div className="container">
                    <div className="row gutter_35px">
                        <div className="col-lg-12">
                            <div className="blog_post_section  three_column news_wrapper_grid style_five">
                                <div className="grid_show_case grid_layout clearfix row">
                                    {
                                        articles.map(article => {
                                            const datePublished = new Date(article.date_published)
                                            const dateString = datePublished.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
                                            return (
                                                <div key={article.id} className="grid_box _card">
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
                                                            <p className="short_desc">{article.teaser}</p>
                                                            <Link href={`/articles/${article.slug}`} className="link__go">Keep reading<i className="icon-right-arrow-long" /></Link>
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
                </div>
                {/*===============spacing==============*/}
                <div className="pd_bottom_60" />
                {/*===============spacing==============*/}
            </section>

        </>
    )
}
