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
        </div>
      </div>

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
