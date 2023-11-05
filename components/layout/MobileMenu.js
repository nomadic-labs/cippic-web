import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Fade from 'react-reveal/Fade';
export default function MobileMenu({ handleMobileMenu, topics, contentTypes }) {
    const router = useRouter()
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
                            <li className="menu-item mega_menu nav-item">
                                <Link href="/" className="nav-link">
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="menu-item menu-item-has-children dropdown nav-item">
                                <button onClick={() => handleToggle(1)} className="nav-link dropdown-toggle">
                                    <span>Our Work</span>
                                </button>
                                <ul className="dropdown-menu" style={{ display: `${isActive.key == 1 ? "block" : "none"}` }}>
                                    { contentTypes.map((item, index) => (
                                        <Fade key={item.id} delay={60*index}>
                                            <li className="menu-item nav-item">
                                                <Link href={`/our-work/${item.slug}`} className="dropdown-item nav-link">
                                                    <span className="text-faded">{item.name}</span>
                                                </Link>
                                            </li>
                                        </Fade>
                                    ))}
                                </ul>
                            </li>
                            <li className="menu-item menu-item-has-children dropdown nav-item">
                                <button onClick={() => handleToggle(2)} className="nav-link dropdown-toggle">
                                    <span>Issues</span>
                                </button>
                                <ul className="dropdown-menu" style={{ display: `${isActive.key == 2 ? "block" : "none"}` }}>
                                    { keyTopics.map((topic, index) => (
                                        <Fade key={topic.id} delay={60*index}>
                                            <li className="menu-item nav-item">
                                                <Link href={`/issues/${topic.slug}`} className="dropdown-item nav-link">
                                                    <span className="text-faded">{topic.name}</span>
                                                </Link>
                                            </li>
                                        </Fade>
                                    ))}
                                </ul>
                            </li>
                            <li className="menu-item  mega_menu nav-item">
                                <Link href="/students" className="nav-link">
                                    <span>Students</span>
                                </Link>
                            </li>
                            <li className="menu-item  mega_menu nav-item">
                                <Link href="/about-us" className="nav-link">
                                    <span>About us</span>
                                </Link>
                            </li>
                            <li className="menu-item mega_menu nav-item">
                                <Link href="/contact" className="nav-link">
                                    <span>Contact</span>
                                </Link>
                            </li>
                        
                            <li className="menu-item mega_menu nav-item">
                                <Link href="/donate" className="nav-link">
                                    <span>Donate</span>
                                </Link>
                            </li>
                            <li className="menu-item mega_menu nav-item">
                                <Link href={router.route} locale={router.locale === 'en' ? 'fr' : 'en'} className="nav-link">
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
