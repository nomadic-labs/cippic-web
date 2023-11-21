import Layout from "@/components/layout/Layout"
import Header from "@/components/sections/Header"
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import ArticleCard from "@/components/elements/ArticleCard"
import ReactMarkdown from 'react-markdown'
import dynamic from 'next/dynamic';
import Fade from 'react-reveal/Fade';
import getLayoutData from "@/utils/layout-data"
import { useContext } from 'react'
import { TranslationContext } from '@/contexts/TranslationContext'

const PortfolioFilter3Col = dynamic(() => import('@/components/elements/PortfolioFilter3Col'), {
    ssr: false,
})

const qs = require('qs');

export const getStaticProps = async ({ params, locale }) => {
    const layout = await getLayoutData(locale)

    const articlesQuery = qs.stringify(
      {
        locale,
        sort: "date_published:desc",
        populate: [
          '*',
          'main_image',
          'main_image.media',
          'categories',
          'content_types'
        ],
        publicationState: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 'preview' : 'live'
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const articlesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${articlesQuery}`)
    const articlesJson = await articlesRes.json()
    const articles = articlesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const content = { articles }

    return { 
        props: { content, layout }, 
        revalidate: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 10 : false
    }
}

export default function IssuesPage({ content, layout }) {
    const { articles } = content;
    const terms = useContext(TranslationContext)
    const latestArticles = articles.slice(0,3)

    const articleFilters = articles.reduce((filters, article) => {
        const articleCategories = article.categories.data.map(ct => ct.attributes)
        const newFilters = articleCategories.map(act => {
            const filterExists = filters.find(f => f?.slug === act.slug)
            if (!filterExists) {
                return act
            }
        }).filter(i => i)
        return filters.concat(newFilters)
    }, [])

    return (
        <>
            <Layout 
                layout={layout.layout}
                translation={layout.translation}
                topics={layout.categories} 
                contentTypes={layout.contentTypes}
            >

            <Header>
                <div className="title-section ">
                    <h1 className="mt-0 underline">{terms.issues}</h1>
                    <h2 className="title-small">{terms.latest}</h2>
                </div>
                            
                <div className="row header-articles">
                {
                        latestArticles.map((article, index) => {
                            return (
                                <div key={article.id} className="article">
                                    <Fade bottom delay={index * 60}>
                                        <ArticleCard 
                                            article={article} 
                                            showDate
                                            showImage
                                            imageTop
                                            showTags
                                        />
                                    </Fade>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </Header>
                <section className="section-md">
                    <div className="container">
                        <div className="row">
                            <div className="project_all filt_style_one filter_enabled">
                                <PortfolioFilter3Col articles={articles} filters={articleFilters} filterField="categories" />
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}
