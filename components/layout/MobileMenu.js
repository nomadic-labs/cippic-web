import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
export default function MobileMenu({ handleMobileMenu, topics }) {
    const router = useRouter()
    console.log({router})
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    })

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }

    const keyTopics = topics.filter(t => t.featured)

    return (
        <>
            <div className="crt_mobile_menu">
                <div className="menu-backdrop" onClick={handleMobileMenu} />
                <nav className="menu-box">
                    <div className="close-btn" onClick={handleMobileMenu}><i className="icon-close" /></div>
                    <form role="search" method="get" action="#">
                        <input type="search" className="search" placeholder="Search..." name="s" title="Search" />
                        <button type="submit" className="sch_btn"> <i className="icon-search" /></button>
                    </form>
                    <div className="menu-outer">
                        <ul id="myNavbar" className="navbar_nav">
                            <li className="menu-item  menu-item-has-children dropdown dropdown_full mega_menu nav-item">
                                <Link href="/" className="dropdown-toggle nav-link">
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="menu-item  menu-item-has-children dropdown dropdown_full mega_menu nav-item">
                                <Link href="/about-us" className="dropdown-toggle nav-link">
                                    <span>About us</span>
                                </Link>
                            </li>
                            <li className="menu-item  menu-item-has-children dropdown dropdown_full mega_menu nav-item">
                                <Link href="/news" className="dropdown-toggle nav-link">
                                    <span>News</span>
                                </Link>
                            </li>
                            <li className="menu-item  menu-item-has-children dropdown dropdown_full mega_menu nav-item">
                                <Link href="/contact" className="dropdown-toggle nav-link">
                                    <span>Contact us</span>
                                </Link>
                            </li>
                            <li className="menu-item menu-item-has-children dropdown nav-item">
                                <Link href="#" className="dropdown-toggle nav-link">
                                    <span>Key Topics</span>
                                </Link>
                                <ul className="dropdown-menu" style={{ display: `${isActive.key == 2 ? "block" : "none"}` }}>
                                    { keyTopics.map(topic => (
                                        <li key={topic.id} className="menu-item nav-item">
                                            <Link href={`/topics/${topic.slug}`} className="dropdown-item nav-link">
                                                <span>{topic.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="dropdown-btn" onClick={() => handleToggle(2)}><span className="fa fa-angle-down" /></div>
                            </li>
                            <li className="menu-item  menu-item-has-children dropdown dropdown_full mega_menu nav-item">
                                <Link href={router.route} locale={router.locale === 'en' ? 'fr' : 'en'} className="dropdown-toggle nav-link">
                                    <span>{`${router.locale === 'en' ? 'FR' : 'EN'}`}</span>
                                </Link>
                            </li>
                        </ul>

                    </div>
                </nav>
            </div>
        </>
    )
}
