import Link from 'next/link'
import { imageBuilder } from '@/content/sanity'

export default function Component({blog}) {
  return (
    <>
      <Link href={`/blog/${blog.slug}/`}>
        <a>
          <div style={{paddingBottom: 30}}>
            <a className="coinHolder">
              <div>
                <img
                  alt={`Icon for ${blog.coin.title}`}
                  src={imageBuilder.image(blog.coin.coverImage).width(23).height(23).url()}
                />
              </div>
              <div>
                <h3 style={{fontWeight: "500"}}>{blog.coin.title} <span style={{opacity: 0.5}}>({blog.coin.slug})</span></h3>
              </div>
            </a>
            <h2 style={{marginTop: 8}}>{blog.title}</h2>
            <p style={{ textOverflow: "ellipsis", height: 90, overflow: "hidden", marginBottom: 7}}>{blog.excerpt}</p>
            <div className="button">Devamını Oku</div>
          </div>
        </a>
      </Link>
    </>
  )
}
