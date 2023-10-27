import Preloader from "@/components/elements/Preloader"
import { useEffect, useState } from "react"
import AOS from 'aos';

import '../styles/globals.css'
import 'swiper/css'
import "swiper/css/navigation"
import "swiper/css/pagination"

import "../public/assets/css/bootstrap.min.css"
import "../public/assets/css/owl.css"
import "../public/assets/css/flexslider.css"
import "../public/assets/css/font-awesome.min.css"
import "../public/assets/css/icomoon.css"
import "../public/assets/css/jquery.fancybox.min.css"
import "../public/assets/css/scss/elements/theme-css.css"
import "../public/assets/css/style.css"
import "../public/assets/css/woocommerce-layout.css"
import "../public/assets/css/woocommerce.css"


function MyApp({ Component, pageProps }) {
    useEffect(() => {
        AOS.init({
          delay: 100,
          duration: 250,
        });
      });
    
    return (
        <Component {...pageProps} />
    )
} 

export default MyApp
