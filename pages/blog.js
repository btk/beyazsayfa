import { useRouter } from 'next/router'
import { getAllBlogs } from '@/content/api'
import BlockContent from '@sanity/block-content-to-react'
import Link from 'next/link'
import SEO from "../components/seo"

import Layout from '@/components/layout'
import BlogItem from '@/components/blogItem'

export default function Blog({ allBlogs }) {

  return (
    <Layout>
      <SEO title="Blog - Beyaz Sayfa" description="En son çalışmalarımızı ve duyurularımızı sizinle paylaştığımız en son blog yazılarımız."/>
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
