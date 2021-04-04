import { useRouter } from 'next/router'
import { getCoin, getAllCoinsWithSlug } from '@/content/api'
import BlockContent from '@sanity/block-content-to-react'
import { imageBuilder } from '@/content/sanity'
import Link from 'next/link'
import BlogItem from '@/components/blogItem'
import Layout from '@/components/layout'
import markdownStyles from '@/styles/Markdown.module.css'
import SEO from "../../components/seo"

export default function Coin({ coin, blogs }) {
  const router = useRouter()
  if (typeof coin == "undefined") {
    return null;
  }

  if(typeof window != "undefined"){
    coinRedirect(coin.appstore,coin.googleplay);
  }

  return (
    <Layout>
      <SEO title={`${coin.title} ile ilgili Yazılar - Beyaz Sayfa`} description={coin.excerpt}/>
      <div className="coinHead">
        <div>
          <img
            alt={`Cover Image for ${coin.title}`}
            src={imageBuilder.image(coin.coverImage).width(200).url()}
          />
        </div>
        <div>
          <h1>{coin.title}</h1>
          <p>{coin.excerpt}</p>
          <div className="download">
            <a href={coin.appstore}><img src="/as.svg" style={{opacity: coin.appstore ? 1 : 0.5}} alt="Download on App Store"/></a>
            <div style={{width: 10}}></div>
            <a href={coin.googleplay}><img src="/gp.svg" style={{opacity: coin.googleplay ? 1 : 0.5}} alt="Download on Google Play"/></a>
          </div>
        </div>
      </div>
      <BlockContent blocks={coin.content} className={markdownStyles.markdown}/>
      {coin.credits &&
        <>
          <div style={{height: 5}}></div>
          <h2>Teşekkürler</h2>
          <BlockContent blocks={coin.credits} className={markdownStyles.markdown}/>
        </>
      }

      <div style={{height: 10}}></div>
      <h2>Oyundan Blog Yazıları</h2>
      {blogs.length > 0 &&
        <div className="blogList">
          {blogs.map((blog, i) => {
            return <BlogItem key={i} blog={blog}/>
          })}
        </div>
      }
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getCoin(params.slug)
  return {
    props: {
      coin: data?.coin || null,
      blogs: data?.blogs || null
    },
  }
}

export async function getStaticPaths() {
  const allCoins = await getAllCoinsWithSlug()
  return {
    paths:
      allCoins?.map((coin) => ({
        params: {
          slug: coin.slug,
        },
      })) || [],
    fallback: true,
  }
}
