import Image from "next/image"
import Circles from '@/components/svgs/circles'
import ButtonLink from '@/components/elements/ButtonLink'
import ReactMarkdown from 'react-markdown'


export default function FancyHeader({ before_title, title, subtitle, byline, iconSrc, button, tags, children }) {

    return (
      <section className="section-default position-relative bg-two overflow-hidden">
        <Circles />
        <div className="container position-relative">
          <div className="row">
            <div className="col-12">

              <div className="padding-xl bg-one rounded-sm page-header">
                {tags && <div className="tags">
                    <i className="icon-folder" />
                    {tags}
                </div>}
                {before_title && <div className="title-small">{before_title}</div>}
                <div className="title-with-icon">
                  {iconSrc && <div className="icon">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${iconSrc}`}
                      width={32}
                      height={32}
                      alt={`${title} icon`}
                    />
                  </div>}
                  <h1 className="m-0">{title}</h1>
                </div>
                {byline && <p>{byline}</p>}
                {subtitle && <ReactMarkdown className="text-lg">{subtitle}</ReactMarkdown>}
                {button && <div className="mr_top_40"><ButtonLink href={button.button_link} target="_blank">{button.button_text}</ButtonLink></div>}
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}
