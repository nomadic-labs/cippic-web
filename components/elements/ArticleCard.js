import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from 'react-markdown'

export default function ArticleCard ({ 
    article,
    showImage=false, 
    showTeaser=false, 
    showDate=false, 
    imageLeft=false,
    imageTop=false,
    linkText="Keep reading",
    tagsAttribute="categories",
}) {

    if (!article) return null

    let dateString, image;

    if (article.date_published) {
        const datePublished = new Date(article.date_published)
        dateString = datePublished.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
    }

    if (article.main_image?.data) {
        image = article.main_image.data.attributes;
    }

    const categories = article.categories?.data || []
    const content_types = article.content_types?.data || []
    const tagItems = article[tagsAttribute]?.data || []

    const tags = tagItems.map(t => t.attributes.name).join(', ')
    const url = `/articles/${article.slug}`
    const hasImage = showImage && image

    return (
        
        <div className={`article-card ${(hasImage && imageLeft) ? 'image-left' : ''}  ${(hasImage && imageTop) ? 'image-top' : ''} bg-white`}>
            <div className={`image`}>
                { hasImage && <Image width={image.width} height={image.height} src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${image.url}`} alt={image.alternativeText} className="img-fluid" /> }
                <div className="categories">
                    <i className="icon-folder" />{tags}
                </div>
            </div>
            <div className="content_box">
                {
                    showDate && dateString &&
                    <div className="date">
                        <span className="date_in_number">{dateString}</span>
                    </div>
                }

                <Link href={url} className="title">{article.title}</Link>

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
