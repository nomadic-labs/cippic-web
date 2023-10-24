import Layout from "@/components/layout/Layout"
import ContentCard from "@/components/elements/ContentCard"
import ButtonLink from "@/components/elements/ButtonLink"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import getLayoutData from "@/utils/layout-data"
const qs = require('qs');


export const getStaticProps = async () => {
    const layout = await getLayoutData()

    const pageQuery = qs.stringify(
      {
        populate: [
          '*',
          'main_image.media',
          'cta_button',
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

export default function Donate({ content, layout }) {

    return (
        <>
            <Layout 
                contact={layout.contact} 
                topics={layout.categories} 
                contentTypes={layout.contentTypes} 
                studentPages={layout.studentPages}
            >
                    <section className="section-default position-relative bg-two">
                      <div className="container">
                        <div className="row">
                          <div className="col-12">
                            <div className="padding-xl bg-one">
                              <div className="title-small">{content.before_title}</div>
                              <h1>{content.title}</h1>
                              <ReactMarkdown className="text-lg">{content.intro}</ReactMarkdown>
                              <div className="pd_top_20" />
                              <ButtonLink href={content.cta_button.button_link} target="_blank">{content.cta_button.button_text}</ButtonLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section className="section-default bg-one">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                        <div className="content">
                                            <h2>Something here</h2>
                                           
                                        </div>
                                </div>
                            </div>
                            <div className="pd_top_20" />
                            <div className="row">
                                

                                
                            </div>
                        </div>
                    </section>
            </Layout>
        </>
    )

}