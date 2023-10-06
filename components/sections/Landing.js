import Link from "next/link"
import FeaturedArticles from "@/components/sections/FeaturedArticles"
import ArticleCard from "@/components/elements/ArticleCard"

export default function Landing({ headline, key_insights_heading="Key Insights", articles, spotlightHeading, spotlightArticle }) {
    return (
        <>
            <section className="blog-section position-relative bg-two">
              {/*===============spacing==============*/}
              <div className="pd_top_60" />
              {/*===============spacing==============*/}
              <div className="container-xl">
                <div className="row">
                  <div className="col-12">
                    <div className="headline padding-xl">
                      <h1>{headline}</h1>
                    </div>
                  </div>
                </div>
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
