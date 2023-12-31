import FeaturedArticles from "@/components/sections/FeaturedArticles"
import FeaturedStory from '@/components/elements/FeaturedStory'

export default function Landing({ featured_story_heading, latest_news_heading, articles, spotlightArticle }) {
    return (
        <>
          <section id="landing" className="landing-section position-relative bg-light section-md overflow-hidden">
            
            <div className="container-xl position-relative">
              <div className="row">
                <div className="col-12 col-md-7">
                  <div className="title-section">
                      <h2 className="mt-0 title-small underline">{featured_story_heading}</h2>
                  </div>
                  <div className="featured-story">
                    <FeaturedStory 
                        article={spotlightArticle}
                        imageTop
                        showImage
                        showTeaser
                        showDate
                        showTags
                        showLink
                    />
                  </div>
                </div>
                <div className="col-12 col-md-5">
                  <div className="title-section">
                      <h2 className="mt-0 title-small underline">{latest_news_heading}</h2>
                  </div>
                  <FeaturedArticles articles={articles} />
                </div>
              </div>
            </div>
          </section>
        </>
    )
}
