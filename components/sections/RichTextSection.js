import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import ButtonLink from '@/components/elements/ButtonLink'

export default function RichTextSection({ title, subtitle, body, button, background_colour }) {
    return (
        <section className={`bg-${background_colour}`}>
            <div className="container section-default">
                <div className="row">
                    <div className="col-12  ">
                        <div className="title_sections">
                            {title && <h2>{title}</h2>}
                            {subtitle && <p className="text-lg">{subtitle}</p>}
                        </div>
                        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown >
                        <div>
                            { button && 
                            <div className="text-center">
                                <ButtonLink href={button.button_link} target="_blank" className="mr_top_20">
                                    {button.button_text}
                                </ButtonLink>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
