import Layout from "@/components/layout/Layout"
import FeaturedArticles from "@/components/sections/FeaturedArticles"
import LatestNews from "@/components/sections/LatestNews"
import News from "@/components/sections/News"
import Topics from "@/components/sections/Topics"
import Students from "@/components/sections/Students"
import Tab1 from "@/components/sections/Tab1"
import Landing from "@/components/sections/Landing"
import SpotlightArticle from "@/components/elements/SpotlightArticle"
import Fade from 'react-reveal/Fade';
import getLayoutData from "@/utils/layout-data"

const qs = require('qs');

const query = qs.stringify(
  {
    populate: [
      '*',
      'about_cippic',
      'topics',
      'students_pages',
      'students_images.media',
      'about_section_image.media'
    ],
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

const articlesQuery = qs.stringify(
      {
        filters: {
            featured_insights: {
              $eq: true,
            },
        },
        sort: "date_published:desc",
        pagination: {
          start: 0,
          limit: 3
        },
        populate: [
          '*',
          'main_image.media',
          'categories',
          'content_types'
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

const spotlightQuery = qs.stringify(
      {
        filters: {
            featured_story: {
              $eq: true,
            },
        },
        pagination: {
          start: 0,
          limit: 1
        },
        sort: "date_published:desc",
        populate: [
          '*',
          'main_image.media',
          'categories',
          'content_types'
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

const newsQuery = qs.stringify(
      {
        filters: {
            content_types: {
                slug: {
                    $eq: "news"
                }
            },
        },
        sort: "date_published:desc",
        pagination: {
          start: 0,
          limit: 3
        },
        populate: [
          '*',
          'main_image.media',
          'categories',
          'content_types'
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );


export const getStaticProps = async () => {
    const layout = await getLayoutData()

    const pageRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/home-page?${query}`)
    const pageJson = await pageRes.json()
    const page = pageJson.data.attributes

    const articleRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${articlesQuery}`)
    const articleJson = await articleRes.json()
    const articles = articleJson.data.map((article) => ({
      id: article.id,
      ...article.attributes
    }))

    const newsRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${newsQuery}`)
    const newsJson = await newsRes.json()
    const news = newsJson.data.map((article) => ({
      id: article.id,
      ...article.attributes
    }))

    const spotlightRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${spotlightQuery}`)
    const spotlightJson = await spotlightRes.json()
    const spotlight = spotlightJson.data.length > 0 ? spotlightJson.data[0].attributes : news[0]

    const content = { ...page, articles, spotlight, news }

    return { props: { content, layout } }
}

export default function Home5({content, layout}) {
    return (
        <>
            <Layout 
              contact={layout.contact} 
              topics={layout.categories} 
              contentTypes={layout.contentTypes} 
              studentPages={layout.studentPages}
            >
                <Landing 
                  headline={content.headline}
                  before_headline={content.before_headline}
                  intro={content.intro}
                  key_insights_heading={content.key_insights_heading}
                  articles={content.articles}
                  spotlightHeading={content.spotlight_heading}
                  spotlightArticle={content.spotlight}
                />
                <News 
                    topics={content.categories}
                    title={content.news_section_title}
                    before_title={content.news_section_before_title}
                    subtitle={content.news_section_subtitle}
                    articles={content.news}
                />
                <Topics 
                    topics={layout.categories}
                    title={content.topics_section_title}
                    before_title={content.topics_section_before_title}
                    subtitle={content.topics_section_subtitle}
                />
                <Students 
                    images={content.students_images}
                    before_title={content.students_section_before_title}
                    title={content.students_section_title}
                    subtitle={content.students_section_subtitle}
                    description={content.students_description}
                    links={content.students_pages}
                />
            </Layout>
        </>
    )
}