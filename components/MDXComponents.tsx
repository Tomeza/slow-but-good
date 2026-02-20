import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="font-display text-[1.4rem] font-normal mt-12 mb-6 tracking-[-0.01em] text-fg">
      {children}
    </h2>
  ),
  strong: ({ children }) => (
    <strong className="font-medium text-accent">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-5 space-y-2 my-4">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="leading-[2]">{children}</li>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-[2]">{children}</p>
  ),
  hr: () => (
    <div className="w-full h-px bg-border opacity-50 my-10" />
  ),
}
