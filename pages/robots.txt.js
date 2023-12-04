function Robots() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {

  // Generate the doc based on environment
  const staging = 'Disallow: /'
  const production = 'Allow: /'
  const sitemapUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`

  const fileContent = `
    User-agent: *
    ${process.env.NEXT_PUBLIC_PREVIEW_MODE ? staging : production}
    Sitemap: ${sitemapUrl}
  `

  res.setHeader('Content-Type', 'text/plain');
  res.write(fileContent);
  res.end();

  return {
    props: {},
  };
}

export default Robots;