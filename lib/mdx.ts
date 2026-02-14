import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content/writing')

export type PostMeta = {
  title: string
  date: string
  tags: string[]
  description?: string
  ogImage?: string
  slug: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const filePath = path.join(contentDir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)

    return {
      title: data.title || slug,
      date: data.date || '',
      tags: data.tags || [],
      description: data.description || '',
      ogImage: data.ogImage || '',
      slug,
    }
  })

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPost(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  return {
    meta: {
      title: data.title || slug,
      date: data.date || '',
      tags: data.tags || [],
      description: data.description || '',
      ogImage: data.ogImage || '',
      slug,
    },
    content,
  }
}
