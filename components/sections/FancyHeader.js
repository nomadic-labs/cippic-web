import Image from "next/image"
import Circles from '@/components/svgs/circles'
import ButtonLink from '@/components/elements/ButtonLink'
import ReactMarkdown from 'react-markdown'


export default function FancyHeader({ before_title, title, subtitle, byline, iconSrc, button, tags, children }) {

    return (
      <section className="section-default bg-two">
        <div className="container position-relative">
          <div className="row">
            <div className="col-12">
                {tags && <div className="tags">
                    <i className="icon-folder" />
                    {tags}
                </div>}
                <div className="title-with-icon">
                  <h1 className="m-0 underline">{title}</h1>
                </div>
                {byline && <p>{byline}</p>}
                {subtitle && <ReactMarkdown className="text-lg">{subtitle}</ReactMarkdown>}
                {button && <div className="mr_top_40"><ButtonLink href={button.button_link} target="_blank">{button.button_text}</ButtonLink></div>}
                {children}
            </div>
          </div>
        </div>
      </section>
    )
}
