import Link from "next/link"
import { useRouter } from "next/router"
export default function Navbar({ topics=[] }) {
    const router = useRouter()
    const keyTopics = topics.filter(t => t.featured)

    return (
        <>
            <ul id="myNavbar" className="navbar_nav">
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href={router.route} locale={router.locale === 'en' ? 'fr' : 'en'} className="dropdown-toggle nav-link">
                        <span>{`${router.locale === 'en' ? 'FR' : 'EN'}`}</span>
                    </Link>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/about-us" className="dropdown-toggle nav-link">
                        <span>About</span>
                    </Link>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/news" className="dropdown-toggle nav-link">
                        <span>News</span>
                    </Link>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/blog" className="dropdown-toggle nav-link">
                        <span>Blog</span>
                    </Link>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/students" className="dropdown-toggle nav-link">
                        <span>Student Program</span>
                    </Link>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/" className="dropdown-toggle nav-link">
                        <span>Key Topics</span>
                        <span className="fa fa-angle-down mr_left_5"></span>
                    </Link>
                    <ul className="dropdown-menu">
                        {
                            keyTopics.map(topic => {
                                return(
                                    <li key={topic.id} className="menu-item  nav-item">
                                        <Link href={`/topics/${topic.slug}`} className="dropdown-item nav-link"> 
                                            <span>{topic.name} </span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </li>

                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/contact" className="dropdown-toggle nav-link">
                        <span>Contact us</span>
                    </Link>
                </li>
            </ul>
        </>
    )
}
