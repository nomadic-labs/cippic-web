import Link from "next/link"
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
                        {/*<span className="fa fa-angle-down mr_left_5"></span>*/}
                    </Link>
                    {/*<ul className="dropdown-menu">
                        {
                            studentPages.map(page => {
                                return(
                                    <li key={page.id} className="menu-item  nav-item">
                                        <Link href={`/students/${page.slug}`} className="dropdown-item nav-link"> 
                                            <span>{page.title}</span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>*/}
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/" className="dropdown-toggle nav-link">
                        <span>About Us</span>
                        <span className="fa fa-angle-down mr_left_5"></span>
                    </Link>
                    <ul className="dropdown-menu">
                        <li className="menu-item  nav-item">
                            <Link href={`/staff`} className="dropdown-item nav-link"> 
                                <span>Staff</span>
                            </Link>
                        </li>
                        <li className="menu-item  nav-item">
                            <Link href={`/contact`} className="dropdown-item nav-link"> 
                                <span>Contact Us</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href={router.route} locale={router.locale === 'en' ? 'fr' : 'en'} className="dropdown-toggle nav-link">
                        <span>{`${router.locale === 'en' ? 'FR' : 'EN'}`}</span>
                    </Link>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href="/donate" className="dropdown-toggle nav-link">
                        <span>Donate</span>
                    </Link>
                </li>
                
            </ul>
        </>
    )
}
