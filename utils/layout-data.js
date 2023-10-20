const qs = require('qs');

const contactQuery = qs.stringify(
  {
    populate: [
      '*',
      'main_logo.media',
      'uottawa_logo.media'
    ],
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

const categoriesQuery = qs.stringify(
  {
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

export default async function getLayoutData() {
	const contactRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/organization-information?${contactQuery}`)
	const contactJson = await contactRes.json()
	const contact = { ...contactJson.data.attributes }

	const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/categories?${categoriesQuery}`)
	const categoriesJson = await categoriesRes.json()
	const categories = categoriesJson.data.map(t => ({ id: t.id, ...t.attributes}))

	const contentTypesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/content-types?${contentTypesQuery}`)
	const contentTypesJson = await contentTypesRes.json()
	const contentTypes = contentTypesJson.data.map(t => ({ id: t.id, ...t.attributes}))

	const studentPagesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/student-pages?sort=title`)
	const studentPagesJson = await studentPagesRes.json()
	const studentPages = studentPagesJson.data.map(t => ({ id: t.id, ...t.attributes}))

	return { contact, categories, contentTypes, studentPages }
}

