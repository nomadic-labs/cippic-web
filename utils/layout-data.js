const qs = require('qs');


export default async function getLayoutData(locale="en") {
  const layoutQuery = qs.stringify(
    {
      locale: locale,
      populate: [
        '*',
        'main_logo.media',
        'alternate_logo.media',
        'favicon.media',
        'header_links',
        'footer_links',
        'social_media_links',
        'footer_logo_links',
        'footer_logo_links.media',
      ],
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const categoriesQuery = qs.stringify(
    {
      locale: locale,
      populate: [
        '*',
        'icon.media'
      ],
      sort: "name:asc"
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const contentTypesQuery = qs.stringify(
    {
      locale: locale,
      populate: [
        '*',
        'icon.media'
      ],
      sort: "name:asc"
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

	const layoutRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/layout?${layoutQuery}`)
	const layoutJson = await layoutRes.json()
	const layout = { ...layoutJson.data.attributes }

	const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/categories?${categoriesQuery}`)
	const categoriesJson = await categoriesRes.json()
	const categories = categoriesJson.data.map(t => ({ id: t.id, ...t.attributes}))

	const contentTypesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/content-types?${contentTypesQuery}`)
	const contentTypesJson = await contentTypesRes.json()
	const contentTypes = contentTypesJson.data.map(t => ({ id: t.id, ...t.attributes}))

  const translationsRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/translation?locale=${locale}`)
  const translationJson = await translationsRes.json()
  const translation = { id: translationJson.data.id, ...translationJson.data.attributes} 

	return { layout, categories, contentTypes, translation }
}

