import Link from "next/link"
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown'

export default function HighlightBox({ title, subtitle, body, background_colour }) {
    return (
        <section className={`bg-${background_colour}`}>
            <div className="container container-reading section-default">
                <div className="row">
                    <div className="col-12">
                        <div className="bg-white padding-lg highlight-border highlight-shadow">
                            <div className="title_sections">
                                {title && <h2>{title}</h2>}
                                {subtitle && <p className="text-lg">{subtitle}</p>}
                            </div>
                            <ReactMarkdown>{body}</ReactMarkdown >
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
