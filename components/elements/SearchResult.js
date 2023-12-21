import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from 'react-markdown'
import {Fade} from 'react-reveal';
import { useContext } from 'react'
import { TranslationContext } from '@/contexts/TranslationContext'

export default function SearchResult ({ 
    article,
    showImage=false, 
    showTeaser=false, 
    showDate=false, 
    imageLeft=false,
    imageTop=false,
    showLink=false,
    showTags=false,
    linkText,
    tagsAttribute="categories",
    bgLight=false,
    order=0
}) {

    if (!article) return null

    const terms = useContext(TranslationContext)

    let dateString, image;

    if (article.date_published) {
        const datePublished = new Date(article.date_published)
        dateString = datePublished.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
    }

    if (article.main_image?.data) {
        image = article.main_image.data.attributes;
    }

    const categories = article.categories
    const content_types = article.content_types

    const tags = [...categories, ...content_types].map(t => t.name).join(', ')
    // const tags = ''
    const url = article.link
    const hasImage = showImage && image

    return (
            <Link href={url} className={`grid-item article-card ${(hasImage && imageLeft) ? 'image-left' : ''}  ${(hasImage && imageTop) ? 'image-top' : ''} ${bgLight ? 'bg-white' : ''}`}>
                <div className={`image`}>
                    { hasImage && <Image width={image.width} height={image.height} src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${image.url}`} alt={image.alternativeText} className="img-fluid" /> }
                </div>
                <div className={`content_box`}>
                    <div>
                    <h3 href={url} className="title mt-0">{article.title}</h3>

                    <p className="byline">
                    {
                        showDate && dateString &&
                        <span className="text-faded">{dateString}</span>
                    }
                    {
                        showTags && tags &&
                        <span className="text-faded">{tags}</span>
                    }
                    </p>

                    { 
                        showTeaser && article.preview &&
                        <p className="preview">{article.preview}</p>
                    }
                    </div>


                    {showLink && <p className="read_more mb-0">{linkText || terms.keep_reading} <i className="icon-right-arrow" /></p>}

                </div>
            </Link>
    )
}
