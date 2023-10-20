import Link from "next/link"
import FeaturedArticles from "@/components/sections/FeaturedArticles"
import ArticleCard from "@/components/elements/ArticleCard"
import ReactMarkdown from 'react-markdown'

export default function Landing({ headline, before_headline, intro, key_insights_heading="Key Insights", articles, spotlightHeading, spotlightArticle }) {
    return (
        <>
            <section className="headline bg-two pd_top_20 pd_bottom_20">
              <div className="container-xl">
                <div className="row">
                  <div className="col-12">
                    <h1 className="headline text-center">{headline}</h1>
                  </div>
                </div>
              </div>
            </section>
            <section id="landing" className="blog-section position-relative bg-one bg_pattern_1">
              {/*===============spacing==============*/}
              <div className="pd_top_10" />
              {/*===============spacing==============*/}
              <div className="container-xl">
                <div className="row">
                  <div className="col-12">
                  </div>
                </div>
                <div className="pd_top_20" />
                <div className="row">
                  <div className="col-12 col-md-8">
                    <div className="title-section">
                        <h2 className="title-small">Featured Story</h2>
                    </div>
                    <ArticleCard 
                        title={spotlightHeading} 
                        article={spotlightArticle} 
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="title-section">
                        <h2 className="title-small">{key_insights_heading}</h2>
                    </div>
                    <FeaturedArticles articles={articles} />
                  </div>
                </div>
              </div>
              {/*===============spacing==============*/}
              <div className="pd_bottom_60" />
              {/*===============spacing==============*/}
            </section>

        </>
    )
}
