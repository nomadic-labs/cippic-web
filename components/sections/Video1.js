
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import VideoBox from "../elements/VideoBox"
export default function Video1() {
    const swiperOptions = {
        // General
        direction: 'horizontal',
        modules: [Autoplay, Pagination, Navigation],
        slidesPerView: 4,
        spaceBetween: 30,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            575: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            991: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1199: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
            1350: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        }
    };
    return (
        <>
            <section className="video-section">
                <div className="row">
                    <div className="col-xl-5 col-lg-5 col-md-12 pd_zero bg_op_1" style={{ background: 'url(/assets/images/banner-four-bg.jpg)' }}>
                        {/*===============spacing==============*/}
                        <div className="pd_top_210" />
                        {/*===============spacing==============*/}
                        <div className="video_btn_all text-center">
                            <div className="video_box">
                                <VideoBox />
                            </div>
                        </div>
                        {/*===============spacing==============*/}
                        <div className="pd_top_210" />
                        {/*===============spacing==============*/}
                    </div>
                    <div className="col-xl-7 col-lg-7 col-md-12 bg_op_1" style={{ backgroundImage: 'url(/assets/images/home-12-testi.jpg)' }}>
                        {/*===============spacing==============*/}
                        <div className="pd_top_80" />
                        {/*===============spacing==============*/}
                        <div className="row">
                            <div className="col-lg-1" />
                            <div className="col-lg-9 col-md-12">
                                <div className="client-brand-wrapper">
                                    <div className="title_all_box style_one light_color">
                                        <div className="title_sections left">
                                            <h2>Creote has extensive experience across all industries. </h2>
                                            <p>Over 20 years of experience we’ll ensure you always get the best guidance.We help
                                                our clients set new standards of excellence.</p>
                                        </div>
                                    </div>
                                    {/*===============spacing==============*/}
                                    <div className="pd_bottom_15" />
                                    {/*===============spacing==============*/}
                                    <div className="client_logo_carousel type_two">
                                        <div className="swiper-container">
                                            <Swiper {...swiperOptions} className="swiper-wrapper">
                                                <SwiperSlide>
                                                    <div className="image text-start">
                                                        <img src="/assets/images/CLIENT-logo-w.png" alt="clients-logo" className="img-fluid" />
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className="image text-start">
                                                        <img src="/assets/images/CLIENT-logo-3-w.png" alt="clients-logo" className="img-fluid" />
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className="image text-start">
                                                        <img src="/assets/images/CLIENT-logo-2-w.png" alt="clients-logo" className="img-fluid" />
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className="image text-start">
                                                        <img src="/assets/images/CLIENT-logo-1-w.png" alt="clients-logo" className="img-fluid" />
                                                    </div>
                                                </SwiperSlide>
                                            </Swiper>
                                        </div>
                                    </div>
                                    {/*===============spacing==============*/}
                                    <div className="pd_bottom_40" />
                                    {/*===============spacing==============*/}
                                    <div className="row gutter_20px">
                                        <div className="col-lg-5 col-md-12">
                                            <div className="contact_box_content style_two">
                                                <div className="contact_box_inner color_two">
                                                    <div className="icon_bx">
                                                        <span className="fa fa-whatsapp" />
                                                    </div>
                                                    <div className="text ">
                                                        <h3>What’s App Chat</h3>
                                                        <p>(888)456 - 7890 - 12354</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*===============spacing==============*/}
                                            <div className="pd_bottom_30" />
                                            {/*===============spacing==============*/}
                                        </div>
                                        <div className="col-lg-5 col-md-12">
                                            <div className="contact_box_content  style_two">
                                                <div className="contact_box_inner color_two">
                                                    <div className="icon_bx">
                                                        <span className="fa fa-skype" />
                                                    </div>
                                                    <div className="text ">
                                                        <h3>Skype Meet</h3>
                                                        <p>creotesuppot@gmail.com</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2" />
                        </div>
                        {/*===============spacing==============*/}
                        <div className="pd_bottom_60" />
                        {/*===============spacing==============*/}
                    </div>
                </div>
            </section>

        </>
    )
}
