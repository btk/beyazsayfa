import Head from 'next/head'
import Layout from '../components/layout';
import Link from 'next/link'
import { getAllBlogs } from '@/content/api'
import { imageBuilder } from '@/content/sanity'
import SEO from "../components/seo"
import BlogItem from '@/components/blogItem'

export default function Home({ allBlogs }) {
  return (
    <Layout headerBorder={true}>
      <SEO title="Beyaz Sayfa - Kripto'ya beyaz sayfa açın!" description="Kripto'ya beyaz sayfa açın!"/>
      <h1>Blog Yazıları</h1>
      <p style={{height: 2}}></p>
      <div className="blogList">
        {
          allBlogs.map((blog, i) => {
            return <BlogItem key={i} blog={blog}/>
          })
        }
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const allBlogs = (await getAllBlogs()) || []
  return {
    props: { allBlogs },
  }
}
