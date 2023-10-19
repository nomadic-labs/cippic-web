export default function ButtonLink ({ href, target="", children }) {
    return (
        <a href={href} target={target} rel="nofollow" className="theme-btn five">
            {children}
            <i className="icon-right-arrow"></i>
        </a>
    )
}
