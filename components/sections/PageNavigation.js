import ContentCard from "@/components/elements/ContentCard"

export default function PageNavigation({ navigation_cards=[], background_colour }) {

    return (
        <section className={`bg-${background_colour} pb-5`}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="program-cards">
                            { navigation_cards.map(card => {
                                const url = card.section_id ? `#${card.section_id}` : card.external_url
                                return (
                                    <div className="program-card" key={card.section_id}>
                                        <ContentCard icon={card.icon_class}>
                                            <div>
                                                <h3 className="mt-0">{card.title}</h3>
                                                {
                                                    card.description &&
                                                    <p>{card.description}</p>
                                                }
                                            </div>
                                            <a href={url} className="read_more">
                                                { card.link_text } 
                                                <i className="fa-solid fa-arrow-right-long" />
                                            </a >
                                        </ContentCard>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
