import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext } from 'react'
import { TranslationContext } from '@/contexts/TranslationContext'

export default function Navbar({ topics=[], contentTypes=[], links=[] }) {
    const router = useRouter()
    const keyTopics = topics.filter(t => t.featured)
    const ourWork = contentTypes.filter(ct => ct.featured)
    const terms = useContext(TranslationContext)

    return (
        <>
            <ul id="myNavbar" className="navbar_nav">
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <div className="dropdown-toggle nav-link">
                        <span>{terms.our_work}</span>
                        <span className="fa fa-angle-down mr_left_5"></span>
                    </div>
                    <ul className="dropdown-menu">
                        <li key={"all-work"} className="menu-item  nav-item">
                            <Link href={`/${router.locale}/our-work`} className="dropdown-item nav-link"> 
                                <span>{terms.all_work}</span>
                            </Link>
                        </li>
                        {
                            ourWork.map(item => {
                                return(
                                    <li key={item.id} className="menu-item  nav-item">
                                        <a href={`/${router.locale}/our-work/${item.slug}`} className="dropdown-item nav-link"> 
                                            <span>{item.name} </span>
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </li>
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <div className="dropdown-toggle nav-link">
                        <span>{terms.issues}</span>
                        <span className="fa fa-angle-down mr_left_5"></span>
                    </div>
                    <ul className="dropdown-menu">
                        {
                            keyTopics.map(topic => {
                                return(
                                    <li key={topic.id} className="menu-item  nav-item">
                                        <a href={`/${router.locale}/issues/${topic.slug}`} className="dropdown-item nav-link"> 
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${topic.icon.data?.attributes?.url}`}
                                                height={22}
                                                width={22}
                                                alt=""
                                                className="icon-dark"
                                            />
                                            <span>{topic.name} </span>
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </li>
                {
                    links.map(link => {
                        return (
                            <li key={link.link_path} className="menu-item menu-item-has-children dropdown nav-item">
                                <Link href={`${link.link_path}`} className="dropdown-toggle nav-link">
                                    <span>{link.link_text}</span>
                                </Link>
                            </li>
                        )
                    })
                }
                <li className="menu-item menu-item-has-children dropdown nav-item">
                    <Link href={router.asPath} locale={router.locale === 'en' ? 'fr' : 'en'} className="dropdown-toggle nav-link">
                        <span>{`${router.locale === 'en' ? 'FR' : 'EN'}`}</span>
                    </Link>
                </li>
            </ul>
        </>
    )
}
