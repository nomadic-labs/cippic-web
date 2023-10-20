import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from 'react-markdown'

export default function ContentCard ({ 
    showImage=true, 
    showTeaser=true, 
    showDate=true, 
    imageTop=true,
    icon="icon-star", // icons from icomoon, see /public/assets/css/icomoon.css
    tags,
    image,
    children
}) {

    const hasImage = showImage && image

    return (
        <div className={`article-card ${imageTop ? 'image-top' : 'image-left'} bg-white`}>
            <div className={`image`}>
                { hasImage && <Image width={image.width} height={image.height} src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${image.url}`} alt={image.alternativeText} className="img-fluid" alt="img" /> }
                <div className="categories">
                    <i className={icon} />
                    {tags}
                </div>
            </div>
            <div className="content_box">
                {children}
            </div>
        </div>
    )
}