import { useEffect, useState } from "react"
import { TranslationContext } from '@/contexts/TranslationContext'
import { useRouter } from 'next/router'
// import { Analytics } from '@vercel/analytics/react'


import "../public/assets/css/bootstrap.min.css"
import "../public/assets/css/scss/elements/theme-css.css"
import "../public/assets/css/style.css"


function MyApp({ Component, pageProps }) {
    const [translation, setTranslation] = useState({})
    const { locale } = useRouter()


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
