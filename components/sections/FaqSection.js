import { useState, useMemo } from 'react'
import Link from "next/link"
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import ArticleCard from "@/components/elements/ArticleCard"
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';


export default function FaqSection({ FAQs, before_title, title, subtitle, background_colour, section_id }) {
    const allUuids = useMemo(() => FAQs.map(f => f.id))
    const [expandAll, setExpandAll] = useState(false) 
    const [containerKey, setContainerKey] = useState(0)

    const toggleExpanded = () => {
        setExpandAll(!expandAll)
        setContainerKey(containerKey + 1)
    }

    const preExpanded = expandAll ? allUuids : []

    return (
        <section className={`bg-${background_colour}`} id={section_id}>
            <div className="container section-default ">
                <div className="row">
                    <div className="col-12  " key={containerKey}>
                        <div className="title_sections">
                            {before_title && <div className="before_title">{before_title}</div>}
                            {title && <h2 className="mb-4">{title}</h2>}
                            {subtitle && <div className="mb-3"><ReactMarkdown>{subtitle}</ReactMarkdown></div>}
                        </div>
                        <button className="btn btn-simple" onClick={toggleExpanded}>
                            {`${expandAll ? "Collapse all" : "Expand all"}`}
                        </button>
                        <Accordion 
                            allowMultipleExpanded 
                            allowZeroExpanded
                            preExpanded={preExpanded}
                        >
                            { FAQs.map(faq => {
                                return (
                                    <AccordionItem key={faq.id} uuid={faq.id}>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                <span className="caret"><i className="fa-solid fa-angle-down" /></span>
                                                {faq.Header}
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{faq.Body}</ReactMarkdown>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
