
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"
import { Autoplay, Navigation, Pagination } from "swiper"

import 'swiper/css'
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function ImageSlider({ images=[], slidesPerView=1 }) {
    const swiperOptions = {
        // General
        direction: 'horizontal',
        modules: [Pagination, Navigation],
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,

        // Navigation
        navigation: {
            nextEl: '.h1n',
            prevEl: '.h1p',
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    }

    const breakpoints = {
        768: {
            slidesPerView: slidesPerView,
        }
    }

    return (
        <div className="slider style_four nav_position_one ">

            <Swiper {...swiperOptions} breakpoints={breakpoints} className=" owl_nav_block owl_dots_none theme_carousel">
                { images.map(image => {
                    const sizedImage = image.formats?.medium ? image.formats?.medium : image
                    return (
                        <SwiperSlide className="slide-item-content" key={sizedImage.url}>
                            <div className="slide-item highlight-border bg-transparent">
                                <div className="img-fluid">
                                    <Image 
                                        src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${sizedImage.url}`}
                                        height={sizedImage.height}
                                        width={sizedImage.width}
                                        alt={image.alternativeText}
                                        className=""
                                    />
                                </div>
                            </div>
                            { image.caption && <p className="text-center text-sm mr_top_10">{image.caption}</p> }
                        </SwiperSlide>
                    )
                })}
                
                <div className="owl-nav">
                    <div className="owl-prev h1p">
                        <span>‹</span>
                    </div>
                    <div className="owl-next h1n">
                        <span>›</span>
                    </div>
                </div>

            </Swiper>

        </div>
    )
}
