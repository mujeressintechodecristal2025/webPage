import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  path?: string
  noindex?: boolean
}

const BASE_URL = 'https://fundacionmujeressintechodecristal.org'
const SITE_NAME = 'Fundación Mujeres sin Techo de Cristal'

export default function SEO({ title, description, path = '/', noindex = false }: SEOProps) {
  const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Helmet>
  )
}
