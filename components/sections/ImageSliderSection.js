import Link from "next/link"
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown'
import ImageSlider from "@/components/elements/ImageSlider"

const DEFAULT_SLIDES_PER_VIEW = 3

export default function ImageSliderSection({ images, background_colour, slides_per_view }) {
    const imgArr = images.data.map(i => i.attributes)
    const slides = imgArr.length < (slides_per_view || DEFAULT_SLIDES_PER_VIEW) ? imgArr.length : (slides_per_view || DEFAULT_SLIDES_PER_VIEW)
    return (
        <section className={`bg-${background_colour}`}>
            <div className="container section-md">
                <div className="row">
                    <div className="col-12">
                        <ImageSlider images={imgArr} slidesPerView={slides_per_view} />
                    </div>
                </div>
            </div>
        </section>
    )
}
