import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useState, useRef, useEffect } from 'react'
import { TranslationContext } from '@/contexts/TranslationContext'

export default function Navbar({ topics=[], contentTypes=[], links=[] }) {
    const router = useRouter()
    const keyTopics = topics.filter(t => t.featured)
    const ourWork = contentTypes.filter(ct => ct.featured)
    const terms = useContext(TranslationContext)
    const [isOpenWork, setIsOpenWork] = useState(false)
    const [isOpenIssues, setIsOpenIssues] = useState(false)
    const workMenu = useRef(null)
    const issuesMenu = useRef(null)

    const toggleWorkMenu = (e) => {
        setIsOpenIssues(false)
        setIsOpenWork(!isOpenWork);
    }

    const toggleIssuesMenu = (e) => {
        setIsOpenWork(false)
        setIsOpenIssues(!isOpenIssues);
    }

    useEffect(() => {
        function handleClickOutside(event) {
          if (isOpenWork && workMenu.current && !workMenu.current.contains(event.target)) {
            event.stopPropagation()
            setIsOpenWork(false)
            console.log("close work!")
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [workMenu, isOpenWork]);

    useEffect(() => {
        function handleClickOutside(event) {
          if (isOpenIssues && issuesMenu.current && !issuesMenu.current.contains(event.target)) {
            event.stopPropagation()
            setIsOpenIssues(false)
            console.log("close issues!")
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [issuesMenu, isOpenIssues]);

    useEffect(() => {
        function handleKeyDown(event) {
          if (isOpenIssues && event.key === "Escape") {
            setIsOpenIssues(false)
          }

          if (isOpenWork && event.key === "Escape") {
            setIsOpenWork(false)
          }
        }
        // Bind the event listener
        document.addEventListener("keydown", handleKeyDown);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [isOpenWork, isOpenIssues]);


    return (
        <>
            <ul id="myNavbar" className="navbar_nav">
                <li ref={workMenu} className={`menu-item menu-item-has-children dropdown nav-item ${isOpenWork ? 'is-open' : 'is-closed'}`}>
                    <button className="dropdown-toggle nav-link btn-none" onClick={toggleWorkMenu}>
                        <span>{terms.our_work}</span>
                        <span className="fa fa-angle-down mr_left_5"></span>
                    </button>
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
                <li ref={issuesMenu} className={`menu-item menu-item-has-children dropdown nav-item ${isOpenIssues ? 'is-open' : 'is-closed'}`}>
                    <button className="dropdown-toggle nav-link btn-none" onClick={toggleIssuesMenu}>
                        <span>{terms.issues}</span>
                        <span className="fa fa-angle-down mr_left_5"></span>
                    </button>
                    <ul className="dropdown-menu">
                        <li key={"all-issues"} className="menu-item  nav-item">
                            <Link href={`/${router.locale}/issues`} className="dropdown-item nav-link"> 
                                <span>{terms.all_issues}</span>
                            </Link>
                        </li>
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
