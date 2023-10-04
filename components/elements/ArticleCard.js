import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from 'react-markdown'

export default function ArticleCard ({ 
    article,
    showImage=true, 
    showTeaser=true, 
    showDate=true, 
    imageTop=true,
    linkText="Keep reading" ,
}) {

    if (!article) return null

    console.log({article})

    let dateString, image;

    if (article.date_published) {
        const datePublished = new Date(article.date_published)
        dateString = datePublished.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
    }

    if (article.main_image.data) {
        image = article.main_image.data.attributes;
    }

    const categories = article.categories?.data || []
    const content_types = article.content_types?.data || []
    const tags = categories.concat(content_types).map(t => t.attributes.name).join(', ')
    const url = `/articles/${article.slug}`
    const hasImage = showImage && image

    return (
        <div className={`article-card ${imageTop ? 'image-top' : 'image-left'}`}>
            {
                hasImage &&
                <div className={`image`}>
                    <Image width={image.width} height={image.height} src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${image.url}`} alt={image.alternativeText} className="img-fluid" alt="img" />
                    <Link href={url} className="categories">
                        <i className="icon-folder" />{tags}
                    </Link>
                </div>
            }
            <div className="content_box">
                {
                    showDate && dateString &&
                    <div className="date">
                        <span className="date_in_number">{dateString}</span>
                    </div>
                }

                <h2 className="title"><Link href="/" >{article.title}</Link></h2>
                { !hasImage && <p className="tags text-uppercase text-sm">{tags}</p> }

                { 
                    showTeaser && article.teaser &&
                    <ReactMarkdown>
                        {article.teaser}
                    </ReactMarkdown>
                }

                <Link href={url} className="read_more">{linkText} <i className="icon-right-arrow" /></Link >

            </div>
        </div>
    )
}
