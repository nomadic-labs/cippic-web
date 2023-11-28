import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";


export default function TextWithImages({ images, background_colour, title, subtitle, body }) {
    console.log({})
    const [openLightbox, setOpenLightbox] = useState(false);
    const imgArr = images.data.map(img => {
        return {
            ...img.attributes,
            src: `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${img.attributes.url}`, 
            alt: img.attributes.alternativeText,
            description: img.attributes.caption
        }
    })
    let lightboxImages = [...imgArr];
    let mainImage = imgArr.shift()
    let moreImages = imgArr;
    
    
    return (
        <section className={`bg-${background_colour}`}>
            <div className="container section-md">
                <div className="row">
                  { mainImage &&
                    <div className="col-12 col-lg-4 mx-auto order-lg-2 mr_bottom_40">
                      <button aria-label="toggle image viewer" onClick={() => setOpenLightbox(true)} className="btn btn-clear p-0">
                      <Image 
                          width={mainImage.width} 
                          height={mainImage.height} 
                          src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${mainImage.url}`} 
                          alt={mainImage.alternativeText} 
                          className="mr_bottom_10 img-fluid img-full highlight-shadow" 
                      />
                      <p className="text-sm mr_bottom_10">{mainImage.caption}</p>
                      <div className="thumbnails">
                      {
                        moreImages.map(img => {
                          return (<Image 
                              key={img.url}
                              width={40} 
                              height={40} 
                              src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${img.url}`} 
                              alt={img.alternativeText} 
                              className="img-fluid img-full" 
                          />)
                        })
                      }
                      </div>
                      </button>
                      <Lightbox
                        plugins={[Captions]}
                        open={openLightbox}
                        close={() => setOpenLightbox(false)}
                        slides={lightboxImages}
                      />
                    </div>
                  }
                    <div className="col-12 col-lg-8 mx-auto order-lg-1">
                        <div className="title_sections">
                            {title && <h2>{title}</h2>}
                            {subtitle && <p className="text-lg">{subtitle}</p>}
                        </div>
                        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                            {body}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </section>
    )
}
