import Link from "next/link"
import ReactMarkdown from 'react-markdown'

export default function SpotlightArticle({ article }) {
    const categories = article.categories.data || []
    const content_types = article.content_types.data || []
    const datePublished = new Date(article.date_published)
    const dateString = datePublished.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
    const tags = categories.concat(content_types).map(t => t.attributes.name).join(', ')
    const tagsClasses = content_types.map(t => t.attributes.slug).join(' ')
    const url = `/articles/${article.slug}`

    return (
    <>
        <div className="title_all_box style_one dark_color">
            <div className="title_sections left">
                <h2 className="before_title">Featured Story</h2>
            </div>
        </div>
        <div className="grid_box _card">
            <div className="news_box default_style list_view has_images">
                <div className="image img_hover-1">
                    <img width={750} height={420} src="/assets/images/blog/blog-image-8.jpg" className="img-fluid" alt="img" />
                    <Link href={url} className="categories">
                        <i className="icon-folder" />{article.content_type}
                    </Link>
                </div>
                <div className="content_box">
                    <div className="date">
                        <span className="date_in_number">{dateString}</span>
                    </div>

                    <h2 className="title"><Link href="/" >{article.title}</Link></h2>
                    <p className="tags text-uppercase text-sm">{tags}</p>

                    <ReactMarkdown>
                        {article.teaser}
                    </ReactMarkdown>
                    <Link href={url} className="read_more">Keep reading <i className="icon-right-arrow" /></Link >

                </div>
            </div>
        </div>
    </>
    )
}
