import Link from "next/link"
import FeaturedArticles from "@/components/sections/FeaturedArticles"

export default function Landing({articles, blogPosts}) {
    return (
        <>
            <section className="blog-post" id="blog">
                {/*===============spacing==============*/}
                <div className="pd_top_80" />
                {/*===============spacing==============*/}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <FeaturedArticles articles={articles} />
                            {/*===============spacing==============*/}
                            <div className="pd_bottom_20" />
                            {/*===============spacing==============*/}
                        </div>
                    </div>
                </div>
                {/*===============spacing==============*/}
                <div className="pd_bottom_70" />
                {/*===============spacing==============*/}
            </section>

        </>
    )
}
