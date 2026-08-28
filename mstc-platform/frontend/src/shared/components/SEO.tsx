import { Helmet } from 'react-helmet-async'

interface ArticleMeta {
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

interface SEOProps {
  title: string
  description: string
  path?: string
  noindex?: boolean
  image?: string
  type?: 'website' | 'article'
  article?: ArticleMeta
}

const BASE_URL = 'https://fundacionmujeressintechodecristal.org'
const SITE_NAME = 'Fundación Mujeres sin Techo de Cristal'
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`

export default function SEO({
  title,
  description,
  path = '/',
  noindex = false,
  image,
  type = 'website',
  article,
}: SEOProps) {
  const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`
  const url = `${BASE_URL}${path}`
  const ogImage = image || DEFAULT_IMAGE

  // JSON-LD structured data para artículos (Google los muestra como noticias)
  const articleJsonLd =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          description,
          image: ogImage,
          url,
          datePublished: article?.publishedTime,
          dateModified: article?.modifiedTime || article?.publishedTime,
          author: {
            '@type': 'Organization',
            name: article?.author || SITE_NAME,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE },
          },
          articleSection: article?.section,
          keywords: article?.tags?.join(', '),
        }
      : null

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article metadata */}
      {type === 'article' && article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {type === 'article' && article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {type === 'article' && article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {type === 'article' && article?.section && (
        <meta property="article:section" content={article.section} />
      )}

      {/* JSON-LD */}
      {articleJsonLd && (
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      )}
    </Helmet>
  )
}
