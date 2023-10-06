
import Isotope from "isotope-layout"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import ReactMarkdown from 'react-markdown'
import ArticleCard from '@/components/elements/ArticleCard'

export default function PortfolioFilter3Col({articles, filters}) {
    // Isotope
    const isotope = useRef()
    const [filterKey, setFilterKey] = useState("*")
    useEffect(() => {
        setTimeout(() => {
            isotope.current = new Isotope(".project_container", {
                itemSelector: ".grid-item",
                // layoutMode: "fitRows",
                percentPosition: true,
                masonry: {
                    columnWidth: ".grid-item",
                },
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: false,
                },
            })
        }, 1000)
    }, [])

    useEffect(() => {
        if (isotope.current) {
            filterKey === "*"
                ? isotope.current.arrange({ filter: `*` })
                : isotope.current.arrange({ filter: `.${filterKey}` })
        }
    }, [filterKey])
    const handleFilterKeyChange = useCallback((key) => () => {
        setFilterKey(key)
    },
        []
    )

    const activeBtn = (value) => (value === filterKey ? "current" : "")

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="fliter_group bg-white rounded-lg padding-lg">
                        <p className="title-small text-dark">Filters</p>
                        <ul className="project_filter dark clearfix">
                            <li className={activeBtn("*")} onClick={handleFilterKeyChange("*")}>All</li>
                            {
                                filters.map(filter => {
                                    return(
                                        <li key={filter.slug} className={activeBtn(filter.slug)} onClick={handleFilterKeyChange(filter.slug)}>{filter.name}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="project_container clearfix" style={{ position: 'relative', height: 776 }}>

                <div className="row clearfix">
                    {
                        articles.map(article => {
                            const content_types = article.content_types.data || []
                            const tagsClasses = content_types.map(t => t.attributes.slug).join(' ')

                            return (
                                <div key={article.id} className={`project-wrapper grid-item col-xl-4 col-lg-6 col-md-12 col-sm-12 ${tagsClasses}`}>
                                    <ArticleCard article={article} tagsAttribute="content_types" showImage={false} />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}
