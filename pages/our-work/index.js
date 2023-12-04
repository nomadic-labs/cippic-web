import Layout from "@/components/layout/Layout"
import Header from "@/components/sections/Header"
import ArticleCard from "@/components/elements/ArticleCard"
import dynamic from 'next/dynamic';
import Fade from 'react-reveal/Fade';
import getLayoutData from "@/utils/layout-data"
import { useState } from 'react'
import { useRouter } from 'next/router'

const DEFAULT_PAGESIZE = 10

const FilterContent = dynamic(() => import('@/components/elements/FilterContent'), {
    ssr: false,
})

const qs = require('qs');

async function fetchAllArticles(articles, pagination, locale) {
  try {
    const query = qs.stringify(
        {
          locale: locale,
          populate: [
            'main_image',
            'categories',
            'content_types'
          ],
          pagination: {
            page: pagination.page + 1,
            pageSize: 100
          },
          publicationState: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 'preview' : 'live'
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${query}`)
    const { data, meta } = await res.json()
    const newArticles = data.map(t => ({ id: t.id, ...t.attributes}))
    const accumulator = articles.concat(newArticles)

    if (meta.pagination.page < meta.pagination.pageCount) {
      return await fetchAllArticles(accumulator, meta.pagination, locale)
    } else {
      return accumulator
    }
  } catch (e) {
    console.log(e)
    return []
  }
}

const fetchArticles = async ({ pagination, locale, filters=[] }) => {
    const articlesQuery = qs.stringify(
      {
        locale,
        pagination: pagination,
        sort: "date_published:desc",
        populate: [
            'main_image',
            'categories',
            'content_types'
        ],
        filters: {
            content_types: {
                slug: {
                    $in: filters
                }
            }
        },
        publicationState: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 'preview' : 'live',
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const articlesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${articlesQuery}`)
    const articlesJson = await articlesRes.json()
    const articles = articlesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    return { articles, pagination: articlesJson.meta.pagination }
}

export const getStaticProps = async ({ params, locale }) => {
    const layout = await getLayoutData(locale)
    const {articles} = await fetchArticles({ pagination: { start: 0, limit: 3}, locale })
    const allArticles = await fetchAllArticles([], {page: 0}, locale)

    const articleFilters = allArticles.reduce((filters, article) => {
        const articleContentTypes = article.content_types.data.map(ct => ({ id: ct.id, ...ct.attributes}))
        const newFilters = articleContentTypes.map(act => {
            const filterExists = filters.find(f => f?.slug === act.slug)
            if (!filterExists) {
                return act
            }
        }).filter(i => i)
        return filters.concat(newFilters)
    }, [])

    const articleCounts = articleFilters.reduce((counts, f) => {
        const articlesWithFilterField = allArticles.filter(article => {
            const articleFilterFieldIds = article.content_types.data.map(f => f.attributes.slug)
            return articleFilterFieldIds.includes(f.slug)
        })

        counts[f.slug] = articlesWithFilterField.length
        return counts
    }, {})


    const content = { articles, articleFilters, articleCounts, total: allArticles.length }

    return { 
        props: { content, layout }, 
        revalidate: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 10 : false
    }
}

export default function OurWork({ content, layout }) {
    const { articles, articleFilters, articleCounts, total } = content;
    const terms = layout.translation
    const { locale } = useRouter()

    return (
        <>
            <Layout {...layout} title={terms.our_work}>
            <Header>
                <div className="title-section ">
                    <h1 className="mt-0 underline">{terms.our_work}</h1>
                    <h2 className="title-small">{terms.latest}</h2>
                </div>
                            
                <div className="row header-articles">
                {
                        articles.map((article, index) => {
                            return (
                                <div key={article.id} className="article">
                                    <Fade bottom delay={index * 60}>
                                        <ArticleCard 
                                            article={article} 
                                            showDate
                                            showImage
                                            imageTop
                                            showTags
                                            tagsAttribute="content_types"
                                        />
                                    </Fade>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </Header>
            <main id="main" className="site-main" role="main">
                <section className="section-md">
                    <div className="container">
                        <div className="row">
                            <div className="project_all filt_style_one filter_enabled">
                                <FilterContent 
                                    initialArticles={[]} 
                                    filters={articleFilters} 
                                    articleCounts={articleCounts}
                                    filterField="content_types" 
                                    fetchArticles={fetchArticles}
                                    locale={locale}
                                    count={total}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            </Layout>
        </>
    )
}
