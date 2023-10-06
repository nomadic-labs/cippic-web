
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"
import { Autoplay, Navigation, Pagination } from "swiper"

export default function ImageSlider({ images=[] }) {
    const swiperOptions = {
        // General
        direction: 'horizontal',
        modules: [Autoplay, Pagination, Navigation],
        slidesPerView: 1,
        spaceBetween: 0,
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
        },
    }
    return (
        <div className="slider style_four nav_position_one">

            <Swiper {...swiperOptions} className=" owl_nav_block owl_dots_none theme_carousel rounded-lg">
                { images.map(image => {
                    return (
                        <SwiperSlide className="slide-item-content rounded-lg" key={image.url}>
                            <div className="slide-item">
                                <div className="img-fluid">
                                    <Image 
                                        src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${image.url}`}
                                        height={image.height}
                                        width={image.width}
                                        alt={image.alternativeText}
                                    />
                                </div>
                            </div>
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
