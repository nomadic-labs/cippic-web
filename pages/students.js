import Layout from "@/components/layout/Layout"
import ContentCard from "@/components/elements/ContentCard"
import ButtonLink from "@/components/elements/ButtonLink"
import ImageSlider from "@/components/elements/ImageSlider"
import FancyHeader from "@/components/sections/FancyHeader"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import getLayoutData from "@/utils/layout-data"
const qs = require('qs');


export const getStaticProps = async ({locale}) => {
    const layout = await getLayoutData(locale)

    const pageQuery = qs.stringify(
      {
        locale,
        populate: [
          '*',
          'student_programs',
          'student_programs.apply_button',
          'image_slider',
          'image_slider.images.media',
          'testimonials'
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    
    const pageRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/students-page?${pageQuery}`)
    const page = await pageRes.json()
    const content = { ...page.data.attributes }

    return { props: { content, layout } }
}

export default function StudentsPage({ content, layout }) {
    const imgArr = content.image_slider.images.data.map(i => i.attributes)
    return (
        <>
            <Layout 
                layout={layout.layout} 
                topics={layout.categories} 
                contentTypes={layout.contentTypes} 
            >
                <FancyHeader
                    title={content.title}
                    subtitle={content.subtitle}
                >
                    <div className="program-cards mr_top_40">
                        { content.student_programs.map(program => {
                            return (
                                <div className="program-card" key={program.section_id}>
                                    <ContentCard icon={program.icon_class} tags={program.tag}>
                                        <h3 className="mt-0">{program.title}</h3>
                                        <a href={`#${program.section_id}`} className="read_more">More information <i className="icon-right-arrow" /></a >
                                    </ContentCard>
                                </div>
                            )
                        })}
                    </div>
                </FancyHeader>
                                
                <section className="section-default bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <ReactMarkdown>{content.description}</ReactMarkdown>
                            </div>
                            <div className="col-12 col-lg-6">
                                <ImageSlider images={imgArr} slidesPerView={1} />
                            </div>
                        </div>
                    </div>
                </section>

                {
                    content.student_programs.map(program => {
                        return (
                            <section className={`bg-${program.background_colour}`} id={program.section_id} key={program.section_id}>
                                <div className="container section-default">
                                    <div className="row">
                                        <div className="col-12 col-lg-8 mx-auto">
                                            <div className="title_sections">
                                                <h2>{program.title}</h2>
                                                {program.subtitle && <p className="text-lg">{program.subtitle}</p>}
                                            </div>
                                            <ReactMarkdown>{program.description}</ReactMarkdown >
                                            { program.how_to_apply_description && 
                                            <>
                                                <div className="title_sections">
                                                    <h3>{program.how_to_apply_title}</h3>
                                                </div>
                                                <ReactMarkdown>{program.how_to_apply_description}</ReactMarkdown >
                                            </>
                                            }
                                            { program.apply_button && <div className="text-center"><ButtonLink href={program.apply_button.button_link} target="_blank" className="mr_top_20">{program.apply_button.button_text}</ButtonLink></div>}

                                        </div>
                                    </div>
                                </div>
                            </section>
                        )
                    })
                }
            </Layout>
        </>
    )

}