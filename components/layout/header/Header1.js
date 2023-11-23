import Link from "next/link"
import Navbar from "../Navbar"
import { forwardRef } from 'react'

const Header1 = forwardRef(function Header1(props, ref) {
    const { handleSearch, handleContactPopup, handleMobileMenu, topics, contentTypes, layout } = props;
    const mainLogoSrc = layout.main_logo?.data?.attributes?.url ? `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${layout.main_logo.data.attributes.url}` : "/assets/images/cippic-logo-combined-dark.svg"
    const altLogoSrc = layout.alternate_logo?.data?.attributes?.url ? `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${layout.alternate_logo.data.attributes.url}` : "/assets/images/cippic-logo-alt-dark.svg"
    return (
        <>
            <div className="header_area" id="header_contents">
                <header className="header header_default bg-one get_sticky_header">
                    <div className="container-xl">
                        <div className="row align-items-center">
                            <div className="col-lg-5 col-md-8 col-sm-8 col-xs-8 logo_column">
                                <div className="header_logo_box">
                                    <Link href="/" className="logo navbar-brand">
                                        <img src={mainLogoSrc} alt="CIPPIC" className="logo_default" />
                                        <img src={altLogoSrc} alt="CIPPIC" className="logo__sticky" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-4 col-sm-4 col-xs-4 menu_column">
                                <button ref={ref} aria-label="Menu" onClick={handleMobileMenu} className="theme-btn one navbar_togglers"> 
                                    <div className="hamburger_menu">
                                        <span className="line" />
                                        <span className="line" />
                                        <span className="line" />
                                    </div>
                                </button>
                                <div className="header_content_collapse d-flex justify-content-end">
                                    <div className="header_menu_box">
                                        <div className="navigation_menu">
                                            <Navbar topics={topics} contentTypes={contentTypes} links={layout.header_links} />
                                        </div>
                                    </div>
                                    <div className="header_right_content">
                                        <ul>
                                            <li>
                                                <button aria-label="Search" type="button" className="search-toggler" onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"/></button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    )
})

export default Header1
