import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from 'react-markdown'
import {Fade} from 'react-reveal';
import { useContext } from 'react'
import { TranslationContext } from '@/contexts/TranslationContext'

export default function FeaturedStory ({ 
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

    const categories = article.categories?.data || []
    const content_types = article.content_types?.data || []
    const tagItems = article[tagsAttribute]?.data || []

    const tags = tagItems.map(t => t.attributes.name).join(', ')
    const url = `/articles/${article.slug}`
    const hasImage = showImage && image

    return (
        <Fade delay={100*order}>
            <Link href={url} className={`article-card ${(hasImage && imageLeft) ? 'image-left' : ''}  ${(hasImage && imageTop) ? 'image-top' : ''} ${bgLight ? 'bg-white' : ''}`}>
                <h1 className="title mt-0">{article.title}</h1>
                <div className={`image`}>
                    { hasImage && <Image width={image.width} height={image.height} src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${image.url}`} alt={image.alternativeText} className="img-fluid" /> }
                </div>
                <div className={`content_box`}>

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
                        <p>{article.preview}</p>
                    }


                    {showLink && <p className="read_more">{terms.keep_reading} <i className="fa-solid fa-arrow-right-long" /></p>}

                </div>
            </Link>
        </Fade>
    )
}
