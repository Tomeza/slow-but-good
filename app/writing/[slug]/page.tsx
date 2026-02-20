import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPost, getAllPosts } from '@/lib/mdx'
import { mdxComponents } from '@/components/MDXComponents'
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { meta } = getPost(params.slug)
    return {
      title: `${meta.title} — slow but good`,
      description: meta.description,
      openGraph: {
        title: meta.title,
        description: meta.description,
        type: 'article',
        publishedTime: meta.date,
        images: [{ url: meta.ogImage || '/og-image.png' }],
      },
    }
  } catch {
    return { title: 'Not Found' }
  }
}

export default function WritingPost({ params }: Props) {
  try {
    const { content, meta } = getPost(params.slug)

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: meta.title,
      datePublished: meta.date,
      author: {
        '@type': 'Person',
        name: '早乙女貴昭',
      },
    }

    return (
      <article className="px-[8vw] py-32 max-sm:px-[6vw] max-sm:py-20 max-w-[640px]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p className="font-display text-[0.65rem] tracking-[0.2em] uppercase text-border mb-4">
          {meta.date}
        </p>
        <h1 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-normal mb-12 tracking-[-0.01em] text-fg">
          {meta.title}
        </h1>
        <div className="font-body text-muted font-light leading-[2] text-[0.95rem]">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
        <div className="mt-16 pt-8 border-t border-border/50">
          <Link
            href="/"
            className="font-body text-[0.9rem] text-border hover:text-accent transition-colors"
          >
            &larr; トップページへ戻る
          </Link>
        </div>
      </article>
    )
  } catch {
    notFound()
  }
}
