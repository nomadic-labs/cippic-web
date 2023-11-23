import { useContext } from 'react'
import { TranslationContext } from '@/contexts/TranslationContext'

export default function SearchPopup({ isSearch,handleSearch }) {
    const terms = useContext(TranslationContext)
    return (
        <>
            <div id="search-popup" className={`search-popup ${isSearch ? "popup-visible" : ""}`}>
                <div className="close-search" ariaLabel="Close" onClick={handleSearch}><i className="fa-solid fa-x" /></div>
                <div className="popup-inner">
                    <div className="overlay-layer" />
                    <div className="search-form">
                        <form role="search" method="get" action="/search">
                            <label id="search-label" htmlFor="search">{terms.search}</label>
                            <input id="search" type="text" className="search" placeholder={terms.search} name="term" title="Search" />
                            <button ariaLabel={terms.search} type="submit" className="sch_btn"> <i className="fa-solid fa-magnifying-glass"/></button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
