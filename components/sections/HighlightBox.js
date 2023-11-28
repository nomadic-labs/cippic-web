import Link from "next/link"
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export default function HighlightBox({ title, subtitle, body, background_colour, section_id }) {
    return (
        <section className={`bg-${background_colour}`} id={section_id}>
            <div className="container section-default">
                <div className="row">
                    <div className="col-12">
                        <div className="bg-white padding-lg highlight-border">
                            <div className="title_sections">
                                {title && <h2>{title}</h2>}
                                {subtitle && <p className="text-lg">{subtitle}</p>}
                            </div>
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{body}</ReactMarkdown >
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
