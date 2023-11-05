import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from 'react-markdown'

export default function ContentCard ({ 
    showImage=true, 
    showTeaser=true, 
    showDate=true, 
    imageTop=true,
    bgLight=false,
    noAnimate=false,
    tags,
    image,
    children
}) {

    const hasImage = showImage && image

    return (
        <div className={`article-card ${(hasImage && imageLeft) ? 'image-left' : ''}  ${(hasImage && imageTop) ? 'image-top' : ''} ${bgLight ? 'bg-white' : ''} ${noAnimate ? 'static' : ''}`}>
            <div className={`image`}>
                { hasImage && <Image width={image.width} height={image.height} src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${image.url}`} alt={image.alternativeText} className="img-fluid" alt="img" /> }
            </div>
            <div className="content_box">
                {children}
            </div>
        </div>
    )
}
