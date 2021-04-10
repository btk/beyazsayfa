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
      <SEO title="Hakkında - Beyaz Sayfa" description="Beyaz sayfa hakkında."/>
      <h1>Hakkında</h1>
      <p>Beyaz Sayfa sitesi, kripto paralar için sıkça kullanılan ve kripto paralanın amacı, vizyonunu ve teknolojik altyapısını açıklayan "white paper" teriminden ismini alan, ve bu çizgide kripto paralar ile ilgili genelgeçer bilgileri Türkçe dilinde özümsenebilir hale getirmeyi amaçlayan bir organizasyondur.</p>
      <p>Sitemizde düzenli olarak yeni ve gelecek vaad eden kripto paralarların altyapısını ve amacını blog tadında tanıtıyor olacağız.</p>
    </Layout>
  )
}

export async function getStaticProps() {
  const allCoins = (await getAllCoins()) || []
  return {
    props: { allCoins },
  }
}
