import { useRouter } from 'next/router'
import { getAllCoins } from '@/content/api'
import BlockContent from '@sanity/block-content-to-react'
import { imageBuilder } from '@/content/sanity'
import Link from 'next/link'
import SEO from "../components/seo"

import Layout from '@/components/layout'

export default function Coin({ allCoins }) {

  return (
    <Layout>
      <SEO title="Coinler - Beyaz Sayfa" description="Hakkında yazdığımız tüm coinlerin listesi."/>
      <h1>Coinler</h1>
      <p>Hakkında yazdığımız tüm coinlerin listesi.</p>
      <p style={{height: 2}}></p>
      {
        allCoins.map((coin, i) => {
          return (
            <Link href={`/coin/${coin.slug}/`}>
              <a className={"coinItem"}>
                <img
                  alt={`Cover Image for ${coin.title}`}
                  src={imageBuilder.image(coin.coverImage).height(170).width(170).url()}
                />
                <div className={"coinItemRight"}>
                  <h2>{coin.title}</h2>
                  <p>{coin.excerpt}</p>
                  <div className="button">Yazılar <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><line x1="5" y1="12" x2="19" y2="12"></line><line x1="13" y1="18" x2="19" y2="12"></line><line x1="13" y1="6" x2="19" y2="12"></line></svg></div>
                </div>
              </a>
            </Link>
          )
        })
      }
    </Layout>
  )
}

export async function getStaticProps() {
  const allCoins = (await getAllCoins()) || []
  return {
    props: { allCoins },
  }
}
