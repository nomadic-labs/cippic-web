export default function Card ({ children }) {
    return (
        <div className={`article-card bg-white`}>
            <div className="content_box">
                { children }
            </div>
        </div>
    )
}
