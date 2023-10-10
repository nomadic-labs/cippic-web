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
        <div className={`article-card profile-pic bg-white`}>
            <div className={`image`}>
                { hasImage && <Image width={image.width} height={image.height} src={`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${image.url}`} alt={image.alternativeText} className="img-fluid" alt="img" /> }
                <div className="categories">{profile.title}</div>
            </div>
            <div className="content_box">
                <div className="title">{profile.name}</div>
                <div className="social_media_v_one pd_top_10">
                    <ul>
                    {profile.linkedin &&
                        <li>
                            <a href={profile.linkedin} title="LinkedIn">
                                <span className="fa fa-linkedin" />
                            </a>
                        </li>
                    }
                    {profile.website &&
                        <li>
                            <a href={profile.website} title="Website">
                                <span className="fa fa-link" />
                            </a>
                        </li>
                    }
                    {profile.email &&
                        <li>
                            <a href={`mailto:${profile.email}`} title="Email">
                                <span className="fa fa-envelope" />
                            </a>
                        </li>
                    }
                    </ul>
                </div>
                <div className="pd_top_20" />
                <ReactMarkdown>
                    {profile.bio}
                </ReactMarkdown>
            </div>
        </div>
    )
}
