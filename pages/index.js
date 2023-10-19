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


const contactQuery = qs.stringify(
  {
    populate: [
      '*',
      'main_logo.media',
      'uottawa_logo.media'
    ],
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

const categoriesQuery = qs.stringify(
  {
    populate: [
      '*',
      'icon.media'
    ],
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

const contentTypesQuery = qs.stringify(
  {
    populate: [
      '*',
      'icon.media'
    ],
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

const articlesQuery = qs.stringify(
      {
        filters: {
            featured: {
              $eq: true,
            },
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
    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/home-page?${query}`, {
        method: 'GET',
        headers
    })
    const homepage = await res.json()

    const contactRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/organization-information?${contactQuery}`, {
        method: 'GET',
        headers
    })
    const contact = await contactRes.json()

    const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/categories?${categoriesQuery}`, {
        method: 'GET',
        headers
    })
    const categoriesJson = await categoriesRes.json()
    const categories = categoriesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const contentTypesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/content-types?${contentTypesQuery}`, {
        method: 'GET',
        headers
    })
    const contentTypesJson = await contentTypesRes.json()
    const contentTypes = contentTypesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const studentPagesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/student-pages?sort=title`, {
        method: 'GET',
        headers
    })
    const studentPagesJson = await studentPagesRes.json()
    const studentPages = studentPagesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const articleRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${articlesQuery}`)
    const { data, meta } = await articleRes.json()
    const articles = data.map((article) => ({
      id: article.id,
      ...article.attributes
    }))

    const content = { ...homepage.data.attributes, contact: { ...contact.data.attributes }, categories, articles, contentTypes, studentPages }

    return { props: { content } }
}

export default function Home5({content}) {
    console.log({content})
    return (
        <>
            <Layout contact={content.contact} topics={content.categories} contentTypes={content.contentTypes} studentPages={content.studentPages}>
                <Landing 
                  headline={content.headline}
                  before_headline={content.before_headline}
                  intro={content.intro}
                  key_insights_heading={content.key_insights_heading}
                  articles={content.articles}
                  spotlightHeading={content.spotlight_heading}
                  spotlightArticle={content.articles[0]}
                />
                <News 
                    topics={content.categories}
                    title={content.news_section_title}
                    before_title={content.news_section_before_title}
                    subtitle={content.news_section_subtitle}
                    articles={content.articles}
                />
                <Topics 
                    topics={content.categories}
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