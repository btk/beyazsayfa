import Link from 'next/link'
import { imageBuilder } from '@/content/sanity'

export default function Component({blog}) {
  return (
    <>
      <Link href={`/blog/${blog.slug}/`}>
        <a>
          <img
            alt={`Cover Image for ${blog.title}`}
            src={imageBuilder.image(blog.coverImage).height(150).width(150).url()}
          />
          <div>
            <h2>{blog.title}</h2>
            <p>{blog.excerpt}</p>
          </div>
        </a>
      </Link>
    </>
  )
}
