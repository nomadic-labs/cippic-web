import Fade from 'react-reveal/Fade';
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import ArticleCard from '@/components/elements/ArticleCard'
import { useContext } from 'react'
import { TranslationContext } from '@/contexts/TranslationContext'

export default function FilterContent({articles, filters, filterField="content_types"}) {

    const [selectedFilters, setSelectedFilters] = useState([])
    const [filteredArticles, setFilteredArticles] = useState(articles)
    const terms = useContext(TranslationContext)

    useEffect(() => {
        filterArticles()
    }, [selectedFilters])

    const handleSelectFilter = (filterId) => () => {
        let newSelectedFilters = [...selectedFilters]

        if (filterId === '*') {
            newSelectedFilters = []
        } else if (selectedFilters.includes(filterId)) {
            const filterRemoved = selectedFilters.filter(f => f !== filterId)
            newSelectedFilters = filterRemoved
        } else {
            newSelectedFilters.push(filterId)
        }

        setSelectedFilters(newSelectedFilters)
    }

    const filterArticles = () => {
        setFilteredArticles([])

        let filteredArticles = [...articles]

        if (selectedFilters.length > 0) {
            filteredArticles = filteredArticles.filter(article => {
                const articleFilterFieldIds = article[filterField].data.map(f => f.attributes.slug)
                const matches = articleFilterFieldIds.map(id => selectedFilters.includes(id))
                
                // use .every() to only allow events that match ALL the selected filters.
                // use .some() to keep the events that match ANY of the selected filters.
                return matches.some(m => m)
              })
        }

        setFilteredArticles(filteredArticles)
    }

    const activeBtn = (value) => {
        const noFilters = selectedFilters.length === 0

        if (value === '*' && noFilters) {
            return "current"
        } else {
            return selectedFilters.includes(value) ? "current" : ""
        }

    }

    const articleCounts = useMemo(() => {
        const counts = {}
        filters.forEach(f => {
            const articlesWithFilterField = articles.filter(article => {
                const articleFilterFieldIds = article[filterField].data.map(f => f.attributes.slug)
                return articleFilterFieldIds.includes(f.slug)
            })

            counts[f.slug] = articlesWithFilterField.length
        })

        return counts
    })

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="bg-white padding-md mb-4">
                        <div className="fliter_group">
                            <p className="title-small text-dark mb-0 mr_right_15">{`${terms.filters}:`}</p>
                            <ul className="project_filter dark clearfix">
                                <li className={activeBtn('*')}>
                                    <button className="btn-none" onClick={handleSelectFilter("*")}>
                                        {terms.all}
                                    </button>
                                </li>
                                {
                                    filters.map(filter => {
                                        return(
                                            <li key={filter.slug} className={activeBtn(filter.slug)} >
                                                <button className="btn-none" onClick={handleSelectFilter(filter.slug)}>
                                                    {`${filter.name} (${articleCounts[filter.slug]})`}  
                                                </button>
                                            </li>
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

                    <div className="d-flex flex-column gap-4">
                        {
                            filteredArticles.map(article => {
                                return (
                                    <Fade key={article.id}>
                                    <ArticleCard 
                                        key={article.id}
                                        article={article} 
                                        tagsAttribute={filterField} 
                                        showImage
                                        imageLeft
                                        showTeaser
                                        showDate
                                        bgLight
                                        showTags
                                    />
                                    </Fade>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </>
    )
}
