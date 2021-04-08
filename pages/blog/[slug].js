import { useRouter } from 'next/router'
import { getBlog, getAllBlogsWithSlug } from '@/content/api'
import BlockContent from '@sanity/block-content-to-react'
import { imageBuilder } from '@/content/sanity'
import Link from 'next/link'
import BlogItem from '@/components/blogItem'
import Layout from '@/components/layout'
import SEO from "../../components/seo"
import markdownStyles from '@/styles/Markdown.module.css'

export default function Blog({ blog, moreBlogs, coin }) {
  const router = useRouter()
  if (typeof blog == "undefined") {
    return null;
  }

  return (
    <Layout>
      <SEO title={`${blog.title} - Beyaz Sayfa`}/>
      <Link href={`/coin/${coin.slug}`}>
        <a className="coinHolder">
          <div>
            <img
              alt={`Icon for ${coin.title}`}
              src={imageBuilder.image(coin.coverImage).width(80).height(80).url()}
            />
          </div>
          <div>
            <h3>{coin.title} <span style={{opacity: 0.5}}>({coin.slug})</span></h3>
            <span>{coin.excerpt}</span>
          </div>
        </a>
      </Link>
      <h1>{blog.title}</h1>
      <BlockContent blocks={blog.content} className={markdownStyles.markdown}/>

      <img
        alt={`Cover Image for ${blog.title}`}
        src={imageBuilder.image(blog.coverImage).width(600).url()}
        style={{marginBottom: 20}}
      />

      <div style={{height: 30}}></div>
      <h2>Diğer Yazılar</h2>
      {moreBlogs.length > 0 &&
        <div className="blogList">
          {moreBlogs.map((blog, i) => {
            return <BlogItem key={i} blog={blog}/>
          })}
        </div>
      }
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getBlog(params.slug)
  return {
    props: {
      blog: data?.blog || null,
      moreBlogs: data?.moreBlogs || null,
      coin: data?.coin || null,
    },
  }
}

export async function getStaticPaths() {
  const allBlogs = await getAllBlogsWithSlug()
  return {
    paths:
      allBlogs?.map((blog) => ({
        params: {
          slug: blog.slug,
        },
      })) || [],
    fallback: true,
  }
}
