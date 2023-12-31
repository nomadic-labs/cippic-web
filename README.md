# CIPPIC website documentation

This is the developer documentation for the front end of CIPPIC's website. 

For more information and support please contact sharon@nomadiclabs.ca.

## Architecture and hosting

- The website is a standard [Next.js](https://nextjs.org/) site, which uses React. It's a (mostly)static site that's generated at build time with the content from the CMS. It's hosted on Vercel under the Nomadic Labs account.
- The CMS is [Strapi](https://strapi.io/). It's a headless CMS with a postgres database. The Github repo can be found [here](https://github.com/nomadic-labs/cippic-api) and it's self-hosted on Digital Ocean. 
- There are some legacy assets that are still hosted on CIPPIC's old server, which is on Funio.com. Newly created assets are stored in the Strapi media library. 

## History

The website was previously created on Drupal 6. The legacy content was migrated to the new CMS by converting the HTML to Markdown, so there may be some discrepancies from the conversion. The majority of the pages in the old website used the url format `/en/node/[page_id]` which was not human-friendly or SEO-friendly. So when importing the existing content we generated slugs from the article title, and set up redirects from the old url to the new one. You can find the redirect logic in `next.config.js`.

## I18n
- The website is offered in French and English, although not all of the pages have a direct translation. 
- We are using a combination of Next.js i18n and Strapi translation features. Next.js has [built-in i18n support](https://nextjs.org/docs/pages/building-your-application/routing/internationalization) which we have integrated with [Strapi's internationalization plugin](https://docs.strapi.io/user-docs/content-manager/translating-content). 
- We are using a simple React Context to provide the translations to the components, but if the site grows in complexity there may be a need to install an i18n library like [react-intl](https://formatjs.io/docs/getting-started/installation)

## Environments

There is a staging site at preview.cippic.ca which allows content editors to see their draft content before publishing to the main website. The staging site has the following modifications:
	- show articles before they are published (in `draft` status)
	- use [ISR](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration) to rebuild pages without rebuilding the entire site. This allows editors to see their changes almost immediately (revalidation is set to 10 seconds)
	- disallow robots

Search for the `NEXT_PUBLIC_PREVIEW_MODE` variable in the codebase to see where the site differs on staging vs production 

## Local development

1. Clone the repo
```
git clone git@github.com:nomadic-labs/cippic-web.git
```
2. Install the dependencies
```
cd cippic-web && yarn
```
3. Create a root `.env` file with the following contents:
```
STRAPI_API_TOKEN=[generated token from Strapi admin]
ARCHIVED_SITE_DOMAIN="https://www.cippic.ca"
NEXT_PUBLIC_STRAPI_DOMAIN="https://cms.cippic.ca"
NEXT_PUBLIC_SITE_URL=https://www.cippic.ca
NEXT_PUBLIC_PREVIEW_MODE=true
```
4. Start the local server
```
yarn dev
```
5. (If making style changes) Start sass --watch
```
yarn sass
```

## Overall development process

1. Use the Strapi Content-type builder to make changes to your content structure. This would be for things like adding new component types, creating new content fields, adding translation terms, etc. Refer to [cippic-api](https://github.com/nomadic-labs/cippic-api) for instructions.
2. Update the content itself in the CMS
3. Make your changes to the `cippic-web` codebase
4. Push to `staging` for testing, review, and approval
5. Make a PR to `main` and merge to deploy to production


## Deployment

The website is hosted on Vercel with the Git integration, so any changes pushed to the `staging` branch will rebuild the staging site with the updated code. Any changes pushed to `main` will deploy to the production site.
