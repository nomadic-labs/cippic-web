import { useContext, useEffect, useRef } from 'react'
import { TranslationContext } from '@/contexts/TranslationContext'

export default function SearchPopup({ isSearch,handleSearch }) {
    const inputRef = useRef(null)
    const terms = useContext(TranslationContext)

    useEffect(() => {
        if (isSearch) {
            setTimeout(() => {
                inputRef.current.focus()
            }, 250)
        }
    }, [isSearch])

    return (
        <>
            <div id="search-popup" className={`search-popup ${isSearch ? "popup-visible" : ""}`}>
                <button className="close-search btn btn-none" aria-label="Close" onClick={handleSearch}><i className="fa-solid fa-x" /></button>
                <div className="popup-inner">
                    <div className="overlay-layer" />
                    <div className="search-form">
                        <form role="search" method="get" action="/search">
                            <label className="search-label" htmlFor="search">{terms.search}</label>
                            <input ref={inputRef} autoFocus id="search" type="text" className="search" placeholder={terms.search} name="term" title="Search" />
                            <button type="submit" className="sch_btn"> <i className="fa-solid fa-magnifying-glass"/></button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
