import Link from "next/link"
import FeaturedArticles from "@/components/sections/FeaturedArticles"
import ArticleCard from "@/components/elements/ArticleCard"
import ReactMarkdown from 'react-markdown'
import Circles from '@/components/svgs/circles'

export default function Landing({ headline, before_headline, intro, insights_heading="Insights", articles, spotlightHeading, spotlightArticle }) {
    return (
        <>
          <section className="bg-two">
            <div className="container-xl position-relative">
              <div className="row">
                <div className="col-12 padding-md">
                    <h1 className="title-md text-center">{headline}</h1>
                </div>
              </div>
            </div>
          </section>
          <section id="landing" className="landing-section position-relative bg-one section-md overflow-hidden">
            <Circles />
            <div className="container-xl position-relative">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="title-section">
                      <h2 className="title-small">Featured Story</h2>
                  </div>
                  <ArticleCard 
                      title={spotlightHeading} 
                      article={spotlightArticle}
                      imageTop
                      showImage
                      showTeaser
                      showDate
                  />
                </div>
                <div className="col-12 col-md-6">
                  <div className="title-section">
                      <h2 className="title-small">{insights_heading}</h2>
                  </div>
                  <FeaturedArticles articles={articles} />
                </div>
              </div>
            </div>
          </section>

        </>
    )
}
