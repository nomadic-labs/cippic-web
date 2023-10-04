import { useEffect, useState } from "react"
import Head from 'next/head'
import { useRouter } from 'next/router'
import BackToTop from '../elements/BackToTop'
import Breadcrumb from './Breadcrumb'
import FloatingMenu from './FloatingMenu'
import Footer1 from './footer/Footer1'
import Header1 from './header/Header1'
import Header10 from "./header/Header10"
import Header11 from "./header/Header11"
import Header12 from "./header/Header12"
import Header13 from "./header/Header13"
import Header14 from "./header/Header14"
import Header15 from "./header/Header15"
import Header16 from "./header/Header16"
import Header2 from "./header/Header2"
import Header3 from "./header/Header3"
import Header4 from "./header/Header4"
import Header5 from "./header/Header5"
import Header6 from "./header/Header6"
import Header7 from "./header/Header7"
import Header8 from "./header/Header8"
import Header9 from "./header/Header9"
import MobileMenu from './MobileMenu'
import ModalPopup from './ModalPopup'
import SearchPopup from './SearchPopup'
import SidebarCart from './SidebarCart'
import Footer16 from "./footer/Footer16"
import Footer15 from "./footer/Footer15"
import Footer14 from "./footer/Footer14"
import Footer13 from "./footer/Footer13"
import Footer12 from "./footer/Footer12"
import Footer11 from "./footer/Footer11"
import Footer10 from "./footer/Footer10"
import Footer9 from "./footer/Footer9"
import Footer8 from "./footer/Footer8"
import Footer7 from "./footer/Footer7"
import Footer6 from "./footer/Footer6"
import Footer5 from "./footer/Footer5"
import Footer4 from "./footer/Footer4"
import Footer3 from "./footer/Footer3"
import Footer2 from "./footer/Footer2"


export default function Layout({ 
    headerStyle, 
    footerStyle, 
    breadcrumbTitle, 
    children, 
    blogMetaSingle,
    title="CIPPIC | Canadian Internet Policy and Public Interest Clinic",
    description="The Samuelson-Glushko Canadian Internet Policy and Public Interest Clinic (CIPPIC) is Canada’s first and only public interest technology law clinic.",
    image="/assets/images/test-image.jpg", 
    contact={},
    topics=[],
    contentTypes=[],
    actions=[]
}) {
    // Search
    const [isSearch, setSearch] = useState(false)
    const handleSearch = () => setSearch(!isSearch)

    // Contact popup
    const [isContactPopup, setContactPopup] = useState(false)
    const handleContactPopup = () => setContactPopup(!isContactPopup)

    // Moblile Menu
    const [isMobileMenu, setMobileMenu] = useState(false)
    const handleMobileMenu = () => setMobileMenu(!isMobileMenu)

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

    // Current URL
    const router = useRouter()
    const url = `https://www.cippic.ca{router.pathname}`


    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/logomark.svg" />
                <meta name="image" content={image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:url" content={url} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
                <meta name="twitter:creator" content="@cippic" />
                <meta property="og:title" content={title} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />
                <meta property="og:image" content={image} />
                <meta property="og:description" content={description} />
            </Head>

            <div id="page" className={`page_wapper hfeed site ${scroll ? "fixed-header floating-menu" : ""} ${isMobileMenu ? "crt_mobile_menu-visible" : ""}`}>
                <div id="wrapper_full" className="content_all_warpper">

                    {!headerStyle && <Header1 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} topics={topics} contentTypes={contentTypes} />}
                    {headerStyle == 1 ? <Header1 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} topics={topics} contentTypes={contentTypes} /> : null}
                    {headerStyle == 2 ? <Header2 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} /> : null}
                    {headerStyle == 3 ? <Header3 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} /> : null}
                    {headerStyle == 4 ? <Header4 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} /> : null}
                    {headerStyle == 5 ? <Header5 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} /> : null}
                    {headerStyle == 6 ? <Header6 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} /> : null}
                    {headerStyle == 7 ? <Header7 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} handleCart={handleCart} /> : null}
                    {headerStyle == 8 ? <Header8 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} handleCart={handleCart} /> : null}
                    {headerStyle == 9 ? <Header9 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} handleCart={handleCart} /> : null}
                    {headerStyle == 10 ? <Header10 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} /> : null}
                    {headerStyle == 11 ? <Header11 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} /> : null}
                    {headerStyle == 12 ? <Header12 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} /> : null}
                    {headerStyle == 13 ? <Header13 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} handleCart={handleCart} /> : null}
                    {headerStyle == 14 ? <Header14 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} handleCart={handleCart} /> : null}
                    {headerStyle == 15 ? <Header15 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} /> : null}
                    {headerStyle == 16 ? <Header16 handleSearch={handleSearch} handleContactPopup={handleContactPopup} handleMobileMenu={handleMobileMenu} handleCart={handleCart} /> : null}


                    {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} blogMetaSingle={blogMetaSingle}/>}
                    <div id="content" className="site-content">
                        {children}
                    </div>
                </div>
                {!footerStyle && < Footer1 />}
                {footerStyle == 1 ? < Footer1 /> : null}
                {footerStyle == 2 ? < Footer2 /> : null}
                {footerStyle == 3 ? < Footer3 /> : null}
                {footerStyle == 4 ? < Footer4 /> : null}
                {footerStyle == 5 ? < Footer5 /> : null}
                {footerStyle == 6 ? < Footer6 /> : null}
                {footerStyle == 7 ? < Footer7 /> : null}
                {footerStyle == 8 ? < Footer8 contact={contact} topics={topics} actions={actions} /> : null}
                {footerStyle == 9 ? < Footer9 /> : null}
                {footerStyle == 10 ? < Footer10 /> : null}
                {footerStyle == 11 ? < Footer11 /> : null}
                {footerStyle == 12 ? < Footer12 /> : null}
                {footerStyle == 13 ? < Footer13 /> : null}
                {footerStyle == 14 ? < Footer14 /> : null}
                {footerStyle == 15 ? < Footer15 /> : null}
                {footerStyle == 16 ? < Footer16 /> : null}

                <MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} topics={topics} />
                <SearchPopup isSearch={isSearch} handleSearch={handleSearch} />

            </div>
            <BackToTop />
        </>
    )
}
