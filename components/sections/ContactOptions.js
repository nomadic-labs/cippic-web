import ContentCard from "@/components/elements/ContentCard"
import ReactMarkdown from 'react-markdown'

export default function ContactOptions({ contact_cards=[], background_colour }) {

    return (
        <section className={`bg-${background_colour} pb-5`}>
            <div className="container">
                <div className="row">
                    {
                        contact_cards.map(option => {
                            return(
                                <div key={option.id} className="col-lg-6 col-12 mb-4">
                                    <ContentCard noAnimate>
                                        <div className="contact_box_inner icon_yes">
                                            <div className="icon_bx">
                                                <span className={`fa-solid ${option.icon_class}`} />
                                            </div>
                                            <div className="contnet">
                                                <h3 className="title-small mt-0"> {option.label} </h3>
                                                <ReactMarkdown>
                                                    {option.body}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    </ContentCard>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
