import Fade from 'react-reveal/Fade';
import Link from "next/link"
import { useEffect, useMemo, useState, useRef, useCallback } from "react"
import ArticleCard from '@/components/elements/ArticleCard'
import Loader from '@/components/elements/Loader'
import { useContext } from 'react'
import { TranslationContext } from '@/contexts/TranslationContext'
import { PAGESIZE } from '@/utils/constants'


export default function FilterContent({
    initialArticles=[], 
    filters, 
    filterField="content_types", 
    fetchArticles, 
    articleCounts, 
    locale,
    count
}) {
    const [selectedFilters, setSelectedFilters] = useState([])
    const [articles, setArticles] = useState(initialArticles)
    const [filteredArticles, setFilteredArticles] = useState(initialArticles)
    const [total, setTotal] = useState(count)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const terms = useContext(TranslationContext)
    const loaderRef = useRef(null);

    useEffect(() => {
        if (selectedFilters) {
            filterArticles()
        }
    }, [selectedFilters, locale])

    const loadMore = async () => {
        if (articles.length < total) {
            await fetchData({ append: true, page: currentPage + 1 })
        }
    }

    const fetchData = async ({ append, page }) => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            const data = await fetchArticles({ pagination: {page, pageSize: PAGESIZE}, locale, filters: selectedFilters })
            const newArticles = append ? [...articles, ...data.articles ] : data.articles
            setArticles(newArticles)
            setTotal(data.pagination.total)
            setCurrentPage(data.pagination.page)
            setIsLoading(false);
        } catch {
            setError("Unable to load more articles")
            setIsLoading(false);
        }
      }


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

    const filterArticles = async () => {
        await fetchData({ append: false, page: 1 })
    }

    const activeBtn = (value) => {
        const noFilters = !selectedFilters || selectedFilters.length === 0

        if (value === '*' && noFilters) {
            return "current"
        } else {
            return selectedFilters.includes(value) ? "current" : ""
        }

    }

    useEffect(() => {
        const observer = new IntersectionObserver(async(entries) => {
          const target = entries[0];
          // if (target.isIntersecting && Math.floor(target.intersectionRatio) === 1) {
          if (target.isIntersecting) {
             await loadMore();
          }
        });

        if (loaderRef.current) {
          observer.observe(loaderRef.current);
        }

        return () => {
          if (loaderRef.current) {
            observer.unobserve(loaderRef.current);
          }
        };
      }, [loadMore]);

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
                            articles.map(article => {
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

                    <div ref={loaderRef} className="mt-4 d-flex justify-content-center" style={{height: "100px"}}>
                        <Loader visible={isLoading} color="var(--color-white)" />
                    </div>

                    {
                        error &&
                        <p className="mt-4 d-flex justify-content-center">{error}</p>
                    }
                </div>

            </div>
        </>
    )
}
