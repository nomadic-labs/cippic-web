
import Isotope from "isotope-layout"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import ReactMarkdown from 'react-markdown'
import ArticleCard from '@/components/elements/ArticleCard'

export default function PortfolioFilter3Col({articles, filters, filterField="content_types"}) {
    // Isotope
    const isotope = useRef()
    const [filterKey, setFilterKey] = useState("*")
    const [filteredArticles, setFilteredArticles] = useState(articles)

    const handleFilterKeyChange = useCallback((key) => () => {
        let filtered = articles;

        if (key !== "*") {
            filtered = articles.filter(article => {
                const filterOptions = article[filterField]?.data || []
                const tagsClasses = filterOptions.map(t => t.attributes.slug)
                return tagsClasses.includes(key)
            })
        }

        setFilterKey(key)
        setFilteredArticles(filtered)
    }, [])

    const activeBtn = (value) => (value === filterKey ? "current" : "")


    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="bg-white padding-md mr_bottom_20">
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

            <div className="row">
                <div className="col-12">

                    <div className="grid-wrapper">
                        {
                            filteredArticles.map(article => {
                                return (
                                    <div key={article.id} className={`grid-item`}>
                                        <ArticleCard 
                                            article={article} 
                                            tagsAttribute={filterField} 
                                            showImage
                                            imageTop
                                            showTeaser
                                            showDate
                                            bgLight
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </>
    )
}
