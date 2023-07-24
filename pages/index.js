import Layout from "@/components/layout/Layout"
import About4 from "@/components/sections/About4"
import Blog5 from "@/components/sections/Blog5"
import Contact1 from "@/components/sections/Contact1"
import HeroSlider5 from "@/components/sections/HeroSlider5"
import Banner3 from "@/components/sections/Banner3"
import FeaturedArticles from "@/components/sections/FeaturedArticles"
import FeaturedBlogPosts from "@/components/sections/FeaturedBlogPosts"
import Process3 from "@/components/sections/Process3"
import Project4 from "@/components/sections/Project4"
import Team2 from "@/components/sections/Team2"
import Testimonial5 from "@/components/sections/Testimonial5"
import Service3 from "@/components/sections/Service3"
import Tab1 from "@/components/sections/Tab1"
import Fade from 'react-reveal/Fade';

const qs = require('qs');

const query = qs.stringify(
  {
    populate: [
      '*',
      'about_cippic',
      'topics',
      'cta_tabs',
      'cta_tabs.background_image',
      'cta_tabs.background_image.media',
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

const teamQuery = qs.stringify(
  {
    populate: [
      '*',
      'photo.media'
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

    const teamRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/team-members?${teamQuery}`, {
        method: 'GET',
        headers
    })
    const teamJson = await teamRes.json()
    const teamMembers = teamJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/categories?${categoriesQuery}`, {
        method: 'GET',
        headers
    })
    const categoriesJson = await categoriesRes.json()
    const categories = categoriesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    const articleRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?filters[featured][$eq]=true`)
    const { data, meta } = await articleRes.json()
    const articles = data.map((article) => ({
      id: article.id,
      ...article.attributes
    }))

    const content = { ...homepage.data.attributes, contact: { ...contact.data.attributes }, team_members: teamMembers, categories, articles }

    return { props: { content } }
}

export default function Home5({content}) {
    console.log({content})
    return (
        <>
            <Layout headerStyle={1} footerStyle={8} contact={content.contact} topics={content.categories} >
                <section className="blog-section position-relative bg_pattern_1">
                  {/*===============spacing==============*/}
                  <div className="pd_top_60" />
                  {/*===============spacing==============*/}
                  <div className="container">
                    <div className="row">
                      <div className="col-12 col-md-8">
                        <div className="headline pd_bottom_40">
                          <h1>{content.headline}</h1>
                        </div>
                        <FeaturedArticles title={content.latest_news_heading} articles={content.articles} />
                      </div>
                      <div className="col-12 col-md-4">
                        <FeaturedBlogPosts title={content.latest_blog_posts_heading} articles={content.articles} />
                      </div>
                    </div>
                  </div>
                  {/*===============spacing==============*/}
                  <div className="pd_bottom_60" />
                  {/*===============spacing==============*/}
                </section>
                <About4 
                    title={content.about_section_title} 
                    before_title={content.about_section_before_title}
                    about_list_items={content.about_cippic}
                    image={content.about_section_image?.data?.attributes}
                    link_text={content.about_section_link_text}
                />
                {/*<Team2 
                    team_members={content.team_members}
                    title={content.team_section_title}
                    before_title={content.team_section_before_title}
                />*/}
                <Service3 
                    topics={content.categories}
                    title={content.topics_section_title}
                    before_title={content.topics_section_before_title}
                    subtitle={content.topics_section_subtitle}
                />
                <Tab1 
                    tabs={content.cta_tabs}
                    title={content.get_involved_section_title}
                    before_title={content.get_involved_section_before_title}
                />
            </Layout>
        </>
    )
}