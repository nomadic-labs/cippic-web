import Head from 'next/head'
import { useRouter } from 'next/router'

export default function SEO ({ 
	title, 
	description="The Samuelson-Glushko Canadian Internet Policy and Public Interest Clinic (CIPPIC) is Canada’s first and only public interest technology law clinic.",
	type="website",
	robots_index=true,
	robots_follow=true,
	share_image,
	image,
}) {
	const router = useRouter()
	const url = `${process.env.NEXT_PUBLIC_SITE_URL}${router.pathname}`
	const robotsIndex = robots_index ? 'index' : 'noindex'
	const robotsFollow = robots_follow ? 'follow' : 'nofollow'
	const robots = [robotsIndex, robotsFollow].join(", ")
	let imageUrl = image;

	if (share_image) {
		imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${share_image.data.attributes.url}`
	}

	return (
		<Head>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="image" content={imageUrl} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      <meta name="twitter:url" content={url} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={router.locale} />
      <meta name="robots" content={robots} /> 
  	</Head>
  )
}