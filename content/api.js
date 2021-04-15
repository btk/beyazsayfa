import client, { previewClient } from './sanity'
const getClient = (preview) => (preview ? previewClient : client)

const getUnique = (contents) => {
  const slugs = new Set()
  return contents.filter((content) => {
    if (slugs.has(content.slug)) {
      return false
    } else {
      slugs.add(content.slug)
      return true
    }
  })
}

const blogFields = `
  name,
  title,
  date,
  coin,
  content,
  'slug': slug.current,
`

// dont forget the comma at the end of this template string

export async function getAllBlogsWithSlug() {
  const data = await client.fetch(`*[_type == "blog"]{ 'slug': slug.current }`)
  return data
}

export async function getAllBlogsWithCoin(slug) {
  const results = await getClient(false)
    .fetch(`*[_type == "blog" && coin == $slug] | order(date desc, _updatedAt desc){
      ${blogFields}
    }`,
      { slug }
    )
  return getUnique(results)
}

export async function getAllBlogs(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "blog"] | order(date desc, _updatedAt desc){
      ${blogFields}
    }`)

  for (var i = 0; i < results.length; i++) {
    results[i].coin = (await getCoin(results[i].coin)).coin;
    results[i].excerpt = results[i].content[0].children[0].text;
  }

  return getUnique(results)
}

export async function getBlog(slug) {
  const curClient = getClient()
  const blog = await curClient.fetch(
      `*[_type == "blog" && slug.current == $slug] | order(_updatedAt desc) {
      ${blogFields}
    }`,
      { slug }
    )
    .then((res) => res?.[0]);
  const moreBlogs = await curClient.fetch(
    `*[_type == "blog" && slug.current != $slug && date <= '${blog.date}'] | order(date desc, _updatedAt desc){
      ${blogFields}
    }[0...3]`,
    { slug }
  );


  for (var i = 0; i < moreBlogs.length; i++) {
    moreBlogs[i].coin = (await getCoin(moreBlogs[i].coin)).coin;
    moreBlogs[i].excerpt = moreBlogs[i].content[0].children[0].text;
  }

  const coin = await curClient.fetch(
    `*[_type == "coin" && slug.current == '${blog.coin}'] | order(date desc, _updatedAt desc){
      title,
      'slug': slug.current,
      excerpt,
      'coverImage': coverImage.asset->url,
    }[0]`,
    { slug }
  );

  return { blog, moreBlogs: getUnique(moreBlogs), coin }
}



const coinFields = `
  title,
  excerpt,
  date,
  'slug': slug.current,
  'coverImage': coverImage.asset->url,
`

// dont forget the comma at the end of this template string

export async function getAllCoinsWithSlug() {
  const data = await client.fetch(`*[_type == "coin"]{ 'slug': slug.current }`)
  return data
}

export async function getAllCoins(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "coin"] | order(date desc, _updatedAt desc){
      ${coinFields}
    }`)
  return getUnique(results)
}

export async function getCoin(slug) {
  const curClient = getClient()
  const coin = await curClient.fetch(
      `*[_type == "coin" && slug.current == $slug] | order(_updatedAt desc) {
      ${coinFields}
      content,
    }`,
      { slug }
    )
    .then((res) => res?.[0]);

  const blogs = await getAllBlogsWithCoin(slug);
  return { coin, blogs }
}
