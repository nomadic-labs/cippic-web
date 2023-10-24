export default function ButtonLink ({ href, children, className="", ...rest }) {
    return (
        <a href={href} rel="nofollow" className={`theme-btn five ${className}`} {...rest}>
            {children}
            <i className="icon-right-arrow"></i>
        </a>
    )
}
