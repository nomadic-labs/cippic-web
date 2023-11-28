import ContentCard from "@/components/elements/ContentCard"
import ProfileCard from "@/components/elements/ProfileCard"

export default function TeamSection({ team_members, title, subtitle, background_colour }) {
    return (
        <section className={`contact-section section-default bg-${background_colour}`}>
            <div className="container">
                <div className="row">
                    <div className="col-12  ">
                        <div className="title-section">
                            <h2 className="mt-0">{title}</h2>
                            <p className="text-lg">{subtitle}</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                { team_members.map(tm => {
                    return (
                        <div key={tm.id} className="col-12   mb-4">
                            <ProfileCard profile={tm} />
                        </div>
                    )
                })}
                </div>
            </div>
        </section>
    )
}
