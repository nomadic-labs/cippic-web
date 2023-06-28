import Link from "next/link"
import { useRouter } from "next/router"
export default function Navbar() {
    const router = useRouter()

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
                        <span>About us</span>
                    </Link>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/news" className="dropdown-toggle nav-link">
                        <span>News</span>
                    </Link>
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
