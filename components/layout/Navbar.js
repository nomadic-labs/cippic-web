import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
export default function Navbar({ topics=[], contentTypes=[], studentPages=[] }) {
    const router = useRouter()
    const keyTopics = topics.filter(t => t.featured)
    const ourWork = contentTypes.filter(ct => ct.featured)

    return (
        <>
            <ul id="myNavbar" className="navbar_nav">
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/" className="dropdown-toggle nav-link">
                        <span>Our Work</span>
                        <span className="fa fa-angle-down mr_left_5"></span>
                    </Link>
                    <ul className="dropdown-menu">
                        {
                            ourWork.map(item => {
                                return(
                                    <li key={item.id} className="menu-item  nav-item">
                                        <Link href={`/our-work/${item.slug}`} className="dropdown-item nav-link"> 
                                            <span>{item.name} </span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/" className="dropdown-toggle nav-link">
                        <span>Issues</span>
                        <span className="fa fa-angle-down mr_left_5"></span>
                    </Link>
                    <ul className="dropdown-menu">
                        {
                            keyTopics.map(topic => {
                                return(
                                    <li key={topic.id} className="menu-item  nav-item">
                                        <Link href={`/topics/${topic.slug}`} className="dropdown-item nav-link"> 
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${topic.icon.data?.attributes?.url}`}
                                                height={22}
                                                width={22}
                                                alt=""
                                                className="icon-dark"
                                            />
                                            <span>{topic.name} </span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/students" className="dropdown-toggle nav-link">
                        <span>Students</span>
                    </Link>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/about-us" className="dropdown-toggle nav-link">
                        <span>About Us</span>
                    </Link>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/contact" className="dropdown-toggle nav-link">
                        <span>Contact</span>
                    </Link>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/donate" className="dropdown-toggle nav-link">
                        <span>Donate</span>
                    </Link>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href={router.route} locale={router.locale === 'en' ? 'fr' : 'en'} className="dropdown-toggle nav-link">
                        <span>{`${router.locale === 'en' ? 'FR' : 'EN'}`}</span>
                    </Link>
                </li>
            </ul>
        </>
    )
}
