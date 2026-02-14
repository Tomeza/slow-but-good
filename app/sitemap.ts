import { getAllPosts } from '@/lib/mdx'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const postUrls = posts.map((post) => ({
    url: `https://example.com/writing/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  return [
    { url: 'https://example.com', lastModified: new Date() },
    ...postUrls,
  ]
}
