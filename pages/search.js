import Layout from "@/components/layout/Layout"
import ArticleCard from "@/components/elements/ArticleCard"
import Fade from 'react-reveal/Fade';
import getLayoutData from "@/utils/layout-data"
import Link from "next/link"
import Image from "next/image"

const qs = require('qs');


export const getServerSideProps = async ({ locale, query }) => {
    const layout = await getLayoutData(locale)
    const { term } = query;
    const searchQuery = qs.stringify(
      {
        locale: locale,
        query: term,
        publicationState: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 'preview' : 'live'
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    

    const searchRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/fuzzy-search/search?${searchQuery}`)
    const searchJson = await searchRes.json()

    const content = { searchResults: searchJson }

    return { 
      props: { content, layout }
    }
}

export default function Home5({content, layout}) {
  console.log({content})
  const { searchResults } = content

    return (
        <>
            <Layout 
              layout={layout.layout}
              translation={layout.translation}
              topics={layout.categories} 
              contentTypes={layout.contentTypes}
            > 
            <section className="section-md">
              <div className="container">
                <div className="row">
                  <div className="col-12">

                      <div className="d-flex flex-column gap-4">
                          {
                              searchResults.articles.map(article => {
                                  return (
                                      <ArticleCard 
                                          key={article.id}
                                          article={article} 
                                          showImage
                                          imageLeft
                                          showTeaser
                                          showDate
                                          bgLight
                                          showTags
                                      />
                                  )
                              })
                          }
                      </div>
                  </div>

                </div>
              </div>
              </section>
            </Layout>
        </>
    )
}