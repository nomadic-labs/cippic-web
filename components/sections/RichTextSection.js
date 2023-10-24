import Link from "next/link"
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown'
import ArticleCard from "@/components/elements/ArticleCard"

export default function RichTextSection({ before_title, title, subtitle, body, background_colour }) {
    return (
        <section className={`bg-${background_colour}`}>
            <div className="container container-reading section-default">
                <div className="row">
                    <div className="col-12">
                        <div className="title_sections">
                            {before_title && <div className="before_title">{before_title}</div>}
                            {title && <h2>{title}</h2>}
                            {subtitle && <p className="text-lg">{subtitle}</p>}
                        </div>
                        <ReactMarkdown>{body}</ReactMarkdown >
                    </div>
                </div>
            </div>
        </section>
    )
}
