const qs = require('qs');

async function fetchAllPages(pages, pagination) {
  try {
    const query = qs.stringify(
        {
          locale: "all",
          populate: ["localizations"],
          pagination: {
            page: pagination.page + 1,
            pageSize: 100
          },
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/pages?${query}`)
    const { data, meta } = await res.json()
    const accumulator = pages.concat(data)

    if (meta.pagination.page < meta.pagination.pageCount) {
      return await fetchAllPages(accumulator, meta.pagination)
    } else {
      return accumulator
    }
  } catch (e) {
    console.log(e)
    return []
  }
}

async function fetchAllArticles(articles, pagination) {
  try {
    const query = qs.stringify(
        {
          locale: "all",
          populate: ["localizations"],
          pagination: {
            page: pagination.page + 1,
            pageSize: 100
          },
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${query}`)
    const { data, meta } = await res.json()
    const accumulator = articles.concat(data)

    if (meta.pagination.page < meta.pagination.pageCount) {
      return await fetchAllArticles(accumulator, meta.pagination)
    } else {
      return accumulator
    }
  } catch (e) {
    console.log(e)
    return []
  }
}

async function fetchAllCategories() {
  const catQuery = qs.stringify(
    {
      locale: "all",
      populate: ["localizations"],
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/categories?${catQuery}`)
  const { data, meta } = await res.json()
  return data
}

async function fetchAllContentTypes() {
  const ctQuery = qs.stringify(
    {
      locale: "all",
      populate: ["localizations"],
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/content-types?${ctQuery}`)
  const { data, meta } = await res.json()
  return data
}

function generateEntry(page, changefreq, priority) {
  const defaultUrl = `
    <loc>${`${process.env.NEXT_PUBLIC_SITE_URL}/${page.attributes.slug}`}</loc>
    <lastmod>${page.attributes.updatedAt}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  `
  const mainUrl = `
    <loc>${`${process.env.NEXT_PUBLIC_SITE_URL}/${page.attributes.locale}/${page.attributes.slug}`}</loc>
    <lastmod>${page.attributes.updatedAt}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  `
  const altUrlSelf = `
    <xhtml:link 
      rel="alternate" 
      hreflang="${page.attributes.locale}" 
      href="${process.env.NEXT_PUBLIC_SITE_URL}/${page.attributes.locale}/${page.attributes.slug}" />
  `
  const altUrls = page.attributes.localizations.data.map(loc => {
    return `
    <xhtml:link 
      rel="alternate" 
      hreflang="${loc.attributes.locale}" 
      href="${process.env.NEXT_PUBLIC_SITE_URL}/${loc.attributes.locale}/${loc.attributes.slug}" />`
  }).join('')

  const defaultEntry = `
    <url>
        ${defaultUrl}
        ${altUrlSelf}
        ${altUrls}
    </url>
  `
  const mainEntry = `
    <url>
        ${mainUrl}
        ${altUrlSelf}
        ${altUrls}
    </url>
  `
  if (page.attributes.locale === 'en') {
    return [defaultEntry, mainEntry].join('')
  }

  return mainEntry
}

function generateSiteMap(pages, articles, categories, contentTypes) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
     <url>
       <loc>${process.env.NEXT_PUBLIC_SITE_URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
       <xhtml:link
        rel="alternate"
        hreflang="en"
        href="${process.env.NEXT_PUBLIC_SITE_URL}/en" />
      <xhtml:link
        rel="alternate"
        hreflang="fr"
        href="${process.env.NEXT_PUBLIC_SITE_URL}/fr" />
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_SITE_URL}/fr</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
       <xhtml:link
        rel="alternate"
        hreflang="en"
        href="${process.env.NEXT_PUBLIC_SITE_URL}/en" />
      <xhtml:link
        rel="alternate"
        hreflang="fr"
        href="${process.env.NEXT_PUBLIC_SITE_URL}/fr" />
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_SITE_URL}/issues</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
       <xhtml:link
        rel="alternate"
        hreflang="en"
        href="${process.env.NEXT_PUBLIC_SITE_URL}/en/issues" />
      <xhtml:link
        rel="alternate"
        hreflang="fr"
        href="${process.env.NEXT_PUBLIC_SITE_URL}/fr/issues" />
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_SITE_URL}/fr/issues</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
       <xhtml:link
        rel="alternate"
        hreflang="en"
        href="${process.env.NEXT_PUBLIC_SITE_URL}/en/issues" />
      <xhtml:link
        rel="alternate"
        hreflang="fr"
        href="${process.env.NEXT_PUBLIC_SITE_URL}/fr/issues" />
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_SITE_URL}/our-work</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
       <xhtml:link
        rel="alternate"
        hreflang="en"
        href="${process.env.NEXT_PUBLIC_SITE_URL}/en/our-work" />
      <xhtml:link
        rel="alternate"
        hreflang="fr"
        href="${process.env.NEXT_PUBLIC_SITE_URL}/fr/our-work" />
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_SITE_URL}/fr/our-work</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
       <xhtml:link
        rel="alternate"
        hreflang="en"
        href="${process.env.NEXT_PUBLIC_SITE_URL}/en/our-work" />
      <xhtml:link
        rel="alternate"
        hreflang="fr"
        href="${process.env.NEXT_PUBLIC_SITE_URL}/fr/our-work" />
     </url>
      ${pages.map((page) => generateEntry(page, 'monthly', '0.8')).join('')}
      ${articles.map((page) => generateEntry(page, 'yearly', '0.4')).join('')}
      ${categories.map((page) => generateEntry(page, 'monthly', '0.6')).join('')}
      ${contentTypes.map((page) => generateEntry(page, 'monthly', '0.6')).join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const pages = await fetchAllPages([], {page: 0})
  const articles = await fetchAllArticles([], {page: 0})
  const categories = await fetchAllCategories()
  const contentTypes = await fetchAllContentTypes()

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(pages, articles, categories, contentTypes);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;