import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from 'react-markdown'

export default function ProfileCard ({ 
    profile,
    showImage=true
}) {

    if (!profile) return null

    let image;

    if (profile.photo?.data) {
        image = profile.photo.data.attributes;
    }

    const hasImage = showImage && image

    return (
        <div className={`article-card profile-card bg-white image-left`}>
            <div className={`image`}>
                { hasImage && <Image width={image.width} height={image.height} src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${image.url}`} alt={image.alternativeText} className="img-fluid" alt="img" /> }
            </div>
            <div className="content_box">
                <h3 className="mt-0">{profile.name}</h3>
                <p className="byline mb-3">{profile.title}</p>
                <ReactMarkdown>
                    {profile.bio}
                </ReactMarkdown>
                <div className="social_media_v_one pd_top_10">
                    <ul>
                    {profile.linkedin &&
                        <li>
                            <a href={profile.linkedin} title="LinkedIn">
                                <span className="fa-brands fa-linkedin" />
                            </a>
                        </li>
                    }
                    {profile.website &&
                        <li>
                            <a href={profile.website} title="Website">
                                <span className="fa-solid fa-link" />
                            </a>
                        </li>
                    }
                    {profile.email &&
                        <li>
                            <a href={`mailto:${profile.email}`} title="Email">
                                <span className="fa-solid fa-envelope"></span>
                            </a>
                        </li>
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}
