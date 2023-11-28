import Link from "next/link"
import Fade from 'react-reveal/Fade';
import ImageSlider from "@/components/elements/ImageSlider"

const DEFAULT_SLIDES_PER_VIEW = 3

export default function ImageSliderSection({ images, background_colour, slides_per_view, title, subtitle, section_id }) {
    const imgArr = images.data.map(i => i.attributes)
    
    return (
        <section className={`bg-${background_colour}`} id={section_id}>
            <div className="container section-md">
                <div className="row">
                    <div className="col-12">
                        <div className="title_sections">
                            {title && <h2>{title}</h2>}
                            {subtitle && <p className="text-lg">{subtitle}</p>}
                        </div>
                        <ImageSlider images={imgArr} slidesPerView={slides_per_view} />
                    </div>
                </div>
            </div>
        </section>
    )
}
