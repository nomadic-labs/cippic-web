
import Isotope from "isotope-layout"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import ReactMarkdown from 'react-markdown'
import ArticleCard from '@/components/elements/ArticleCard'

export default function PortfolioFilter3Col({articles, filters, filterField="content_types"}) {
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
                    <div className="bg-white padding-md mr_bottom_30">
                        <div className="fliter_group">
                            <p className="title-small text-dark mb-0 mr_right_15">Filters:</p>
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
            </div>
            <div className="project_container clearfix" style={{ position: 'relative', height: 776 }}>

                <div className="row clearfix">
                    {
                        articles.map(article => {
                            const filterOptions = article[filterField]?.data || []
                            const tagsClasses = filterOptions.map(t => t.attributes.slug).join(' ')

                            return (
                                <div key={article.id} className={`project-wrapper grid-item col-xl-4 col-lg-6 col-md-12 col-sm-12 ${tagsClasses} mr_bottom_30`}>
                                    <ArticleCard article={article} tagsAttribute={filterField} />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}
