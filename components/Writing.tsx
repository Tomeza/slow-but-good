import Link from 'next/link'
import SectionLabel from './SectionLabel'
import ScrollReveal from './ScrollReveal'
import { getAllPosts } from '@/lib/mdx'

export default function Writing() {
  const posts = getAllPosts()

  return (
    <section className="px-[8vw] py-32 max-sm:px-[6vw] max-sm:py-20">
      <ScrollReveal>
        <SectionLabel>Writing</SectionLabel>
      </ScrollReveal>
      {posts.length > 0 ? (
        <ul className="space-y-6">
          {posts.map((post) => (
            <ScrollReveal key={post.slug}>
              <li>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group block"
                >
                  <span className="font-body text-[0.95rem] text-fg font-light group-hover:text-accent transition-colors">
                    {post.title}
                  </span>
                  <span className="font-display text-[0.75rem] text-border ml-4">
                    {post.date}
                  </span>
                </Link>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      ) : (
        <ScrollReveal>
          <p className="font-body text-[0.95rem] text-border font-light">
            準備中。ゆっくりですが、書きます。
          </p>
        </ScrollReveal>
      )}
    </section>
  )
}
