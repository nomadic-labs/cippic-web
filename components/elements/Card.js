export default function Card ({ children }) {
    return (
        <div className={`article-card bg-light`}>
            <div className="content_box">
                { children }
            </div>
        </div>
    )
}
