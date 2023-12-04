import { useEffect, useState, useRef } from "react"
import Head from 'next/head'
import { useRouter } from 'next/router'
import BackToTop from '../elements/BackToTop'
import Header from './Header'
import MobileMenu from './MobileMenu'
import SearchPopup from './SearchPopup'
import Footer from "./Footer"
import SEO from "./SEO"
import { TranslationContext } from '@/contexts/TranslationContext'

export default function Layout({ 
    children, 
    layout={},
    categories=[],
    contentTypes=[],
    translation={},
    localizations,
    seo,
    title="CIPPIC | Canadian Internet Policy and Public Interest Clinic"
}) {
    const router = useRouter()
    
    // Search
    const [isSearch, setSearch] = useState(false)
    const handleSearch = () => setSearch(!isSearch)

    // Contact popup
    const [isContactPopup, setContactPopup] = useState(false)
    const handleContactPopup = () => setContactPopup(!isContactPopup)

    // Moblile Menu
    const mobileMenuRef = useRef(null)
    const menuButtonRef = useRef(null)

    const [isMobileMenu, setMobileMenu] = useState(false)
    const handleMobileMenu = () => setMobileMenu(!isMobileMenu)

    useEffect(() => {
        const handleRouteChange = () => {
          setMobileMenu(false)
        }
     
        router.events.on('routeChangeStart', handleRouteChange)
     
        return () => {
          router.events.off('routeChangeStart', handleRouteChange)
        }
      }, [router])

    useEffect(() => {
        if (isMobileMenu) {
            setTimeout(() => {
                mobileMenuRef.current.focus()
            }, 250)
        } else {
            setTimeout(() => {
                menuButtonRef.current.focus()
            }, 250)
        }   
    }, [isMobileMenu])

    // Scroll Header
    const [scroll, setScroll] = useState(0)
    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY > 100
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck)
            }
        })
    })

    useEffect(() => {
        function handleKeyDown(event) {
          if (isMobileMenu && event.key === "Escape") {
            setMobileMenu(false)
          }

          if (isSearch && event.key === "Escape") {
            setSearch(false)
          }
        }
        // Bind the event listener
        document.addEventListener("keydown", handleKeyDown);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [isMobileMenu, isSearch]);

    const favicon = layout.favicon?.data?.attributes?.url ? `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${layout.favicon.data.attributes.url}` : "/favicon.svg"
    const defaultImg = layout.default_share_image?.data?.attributes?.url ? `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${layout.default_share_image.data.attributes.url}` : null

    return (
        <TranslationContext.Provider value={translation}>
            <Head>
                <title>{title}</title>
                <link rel="shortcut icon" href={favicon} />
            </Head>
            <SEO image={defaultImg} {...seo} />

            <div id="page" className={`page_wapper hfeed site ${scroll ? "fixed-header floating-menu" : ""} ${isMobileMenu ? "crt_mobile_menu-visible" : ""}`}>
                <div id="wrapper_full" className="content_all_warpper">
                    <Header 
                        ref={menuButtonRef} 
                        handleSearch={handleSearch} 
                        handleContactPopup={handleContactPopup} 
                        handleMobileMenu={handleMobileMenu} 
                        layout={layout} 
                        topics={categories} 
                        contentTypes={contentTypes} 
                        localizations={localizations}
                    />

                    <div id="content" className="site-content">
                        {children}
                    </div>
                </div>
                < Footer layout={layout} />

                <MobileMenu 
                    ref={mobileMenuRef} 
                    handleMobileMenu={handleMobileMenu} 
                    links={layout.header_links} 
                    topics={categories} 
                    contentTypes={contentTypes} 
                    localizations={localizations}
                />
                <SearchPopup isSearch={isSearch} handleSearch={handleSearch} />

            </div>
            <BackToTop />
        </TranslationContext.Provider>
    )
}
