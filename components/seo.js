import Link from 'next/link'
import { NextSeo } from 'next-seo';

function SEO({ description, meta, title, canonical }) {

  const metaDescription = description;

  return (
    <NextSeo
      title={title}
      description={metaDescription}
      canonical={canonical}
      openGraph={{
        url: canonical,
        title: title,
        description: metaDescription,
        site_name: 'Beyaz Sayfa',
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `tr`,
  meta: [],
  description: ``,
}

export default SEO
