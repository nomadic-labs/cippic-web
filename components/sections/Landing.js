import Link from "next/link"
import FeaturedArticles from "@/components/sections/FeaturedArticles"
import ArticleCard from "@/components/elements/ArticleCard"

export default function Landing({ headline, key_insights_heading, articles, spotlightHeading, spotlightArticle }) {
    return (
        <>
            <section className="blog-section position-relative bg_pattern_1">
              {/*===============spacing==============*/}
              <div className="pd_top_60" />
              {/*===============spacing==============*/}
              <div className="container-xl">
                <div className="row">
                  <div className="col-12">
                    <div className="headline pd_bottom_40">
                      <h1>{headline}</h1>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-8">
                    <div className="title_all_box style_one dark_color">
                        <div className="title_sections left">
                            <h2 className="before_title">Featured Story</h2>
                        </div>
                    </div>
                    <ArticleCard 
                        title={spotlightHeading} 
                        article={spotlightArticle} 
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <FeaturedArticles title={key_insights_heading} articles={articles} />
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
