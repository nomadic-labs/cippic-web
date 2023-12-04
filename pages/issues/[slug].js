import Layout from "@/components/layout/Layout"
import FancyHeader from "@/components/sections/FancyHeader"
import dynamic from 'next/dynamic';
import getLayoutData from "@/utils/layout-data";
import { useRouter } from 'next/router'

const FilterContent = dynamic(() => import('@/components/elements/FilterContent'), {
    ssr: false,
})

const qs = require('qs');

async function fetchAllArticles(articles, pagination, locale, slug) {
  try {
    const query = qs.stringify(
        {
            locale: locale,
            populate: [
                'main_image',
                'categories',
                'content_types'
            ],
            filters: {
                categories: {
                    slug: {
                        $eq: slug
                    }
                },
            },
          pagination: {
            page: pagination.page + 1,
            pageSize: 100
          },
          publicationState: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 'preview' : 'live'
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${query}`)
    const { data, meta } = await res.json()
    const newArticles = data.map(t => ({ id: t.id, ...t.attributes}))
    const accumulator = articles.concat(newArticles)

    if (meta.pagination.page < meta.pagination.pageCount) {
      return await fetchAllArticles(accumulator, meta.pagination, locale, slug)
    } else {
      return accumulator
    }
  } catch (e) {
    console.log(e)
    return []
  }
}

const fetchArticles = async ({ pagination, locale, slug, filters=[] }) => {
    const articlesQuery = qs.stringify(
      {
        locale,
        pagination: pagination,
        sort: "date_published:desc",
        populate: [
            'main_image',
            'categories',
            'content_types'
        ],
        filters: {
            categories: {
                slug: {
                    $eq: slug
                }
            },
            content_types: {
                slug: {
                    $in: filters
                }
            }
        },
        publicationState: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 'preview' : 'live',
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const articlesRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/articles?${articlesQuery}`)
    const articlesJson = await articlesRes.json()
    const articles = articlesJson.data.map(t => ({ id: t.id, ...t.attributes}))

    return { articles, pagination: articlesJson.meta.pagination }
}

export async function getStaticPaths() {
  if (process.env.NEXT_PUBLIC_PREVIEW_MODE) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/categories?locale=all`)
  const { data, meta } = await res.json()
  const paths = data.map((cat) => ({
    params: { slug: cat.attributes.slug },
    locale: cat.attributes.locale
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params, locale }) => {
    const layout = await getLayoutData(locale)
    const { slug } = params;

    const categoryQuery = qs.stringify(
      {
        locale,
        filters: {
            slug: {
              $eq: slug,
            },
        },
        populate: ['localizations', 'header_image.media'],
        publicationState: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 'preview' : 'live'
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}/api/categories?${categoryQuery}`)
    const categoryJson = await categoryRes.json()
    const categoryData = categoryJson.data[0]

    if (!categoryData) {
        return {
          redirect: {
            destination: "/",
          },
        }
    }

    const category = { id: categoryData.id, ...categoryData.attributes }

    const allArticles = await fetchAllArticles([], {page: 0}, locale, slug)

    const articleFilters = allArticles.reduce((filters, article) => {
        const articleContentTypes = article.content_types.data.map(ct => ({ id: ct.id, ...ct.attributes}))
        const newFilters = articleContentTypes.map(act => {
            const filterExists = filters.find(f => f?.slug === act.slug)
            if (!filterExists) {
                return act
            }
        }).filter(i => i)
        return filters.concat(newFilters)
    }, [])

    const articleCounts = articleFilters.reduce((counts, f) => {
        const articlesWithFilterField = allArticles.filter(article => {
            const articleFilterFieldIds = article.content_types.data.map(f => f.attributes.slug)
            return articleFilterFieldIds.includes(f.slug)
        })

        counts[f.slug] = articlesWithFilterField.length
        return counts
    }, {})

    const articles = allArticles.slice(0,3)

    const content = { category, articles, articleFilters, articleCounts, total: allArticles.length, slug }

    return { 
      props: { content, layout },
      revalidate: process.env.NEXT_PUBLIC_PREVIEW_MODE ? 10 : false 
    }
}

export default function TopicsPage({ content, layout }) {
    const { category, articles, articleFilters, articleCounts, total, slug } = content;
    const { locale } = useRouter()

    let localizations;
    if (category.localizations?.data && category.localizations?.data.length > 0) {
      localizations = category.localizations.data.map(l => {
        return ({
          ...l.attributes,
          link: `${l.attributes.locale}/issues/${l.attributes.slug}`
        })
      })
    }

    const fetchArticlesWithSlug = async(params) => {
        return await fetchArticles({...params, slug: slug})
    }

    let seo = {
      title: category.name,
      description: category.description,
      type: "website",
    }

    if (category.header_image?.data?.attributes) {
      seo.image = `${process.env.NEXT_PUBLIC_STRAPI_DOMAIN}${category.header_image?.data?.attributes?.url}`
    }

    if (category.SEO) {
      seo = { ...seo, ...category.SEO }
    }

    return (
        <>
            <Layout {...layout} localizations={localizations} seo={seo} title={category.name}>
              <FancyHeader
                title={category.name}
                subtitle={category.description}
                iconSrc={category.icon?.data?.attributes?.url}
                image={category.header_image?.data?.attributes}
              />
                <main id="main" className="site-main" role="main">
                <section className="position-relative bg-light section-default">
                  <div className="container">
                      <div className="project_all filt_style_one filter_enabled">
                          <FilterContent 
                              initialArticles={[]} 
                              filters={articleFilters} 
                              articleCounts={articleCounts}
                              filterField="categories" 
                              fetchArticles={fetchArticlesWithSlug}
                              locale={locale}
                              count={total}
                          />
                      </div>
                  </div>
                </section>
                </main>
            </Layout>
        </>
    )
}
