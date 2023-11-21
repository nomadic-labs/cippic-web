import Preloader from "@/components/elements/Preloader"
import { useEffect, useState } from "react"
import { TranslationContext } from '@/contexts/TranslationContext'
import { useRouter } from 'next/router'
import AOS from 'aos';

import '../styles/globals.css'
import 'swiper/css'
import "swiper/css/navigation"
import "swiper/css/pagination"

import "../public/assets/css/bootstrap.min.css"
import "../public/assets/css/owl.css"
import "../public/assets/css/flexslider.css"
import "../public/assets/css/icomoon.css"
import "../public/assets/css/jquery.fancybox.min.css"
import "../public/assets/css/scss/elements/theme-css.css"
import "../public/assets/css/style.css"
import "../public/assets/css/woocommerce-layout.css"
import "../public/assets/css/woocommerce.css"



function MyApp({ Component, pageProps }) {
    const [translation, setTranslation] = useState({})
    const { locale } = useRouter()

    useEffect(() => {
        AOS.init({
          delay: 100,
          duration: 250,
        });
      });

    useEffect(() => {
      const fetchTranslation = async () => {
        const translationsRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/translation?locale=${locale}`)
        const translationJson = await translationsRes.json()
        const t = { id: translationJson.data.id, ...translationJson.data.attributes}
        setTranslation(t)
      }

      fetchTranslation()
    }, [locale])
    
    return (
        <TranslationContext.Provider value={translation}>
            <Component {...pageProps} />
        </TranslationContext.Provider>
    )
} 

export default MyApp
