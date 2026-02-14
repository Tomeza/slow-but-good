import SectionLabel from './SectionLabel'
import ScrollReveal from './ScrollReveal'

const tools = [
  {
    names: ['InDesign', 'Illustrator', 'Photoshop'],
    desc: '紙とインクの世界。一番長い付き合いです。',
  },
  {
    names: ['Next.js', 'Supabase', 'Vercel'],
    desc: '現場で使えるアプリをつくります。私も使ってます。',
  },
  {
    names: ['Claude', 'ChatGPT'],
    desc: 'AIで、あなたの面倒を減らします。ついでに私のも。',
  },
]

export default function Tools() {
  return (
    <section className="px-[8vw] py-32 max-sm:px-[6vw] max-sm:py-20">
      <ScrollReveal>
        <SectionLabel>Tools</SectionLabel>
      </ScrollReveal>
      <div className="grid grid-cols-1 gap-16 max-w-[720px]">
        {tools.map((tool, i) => (
          <ScrollReveal key={i}>
            <div className="grid grid-cols-1 gap-3">
              <p className="font-display text-[clamp(1.2rem,2.5vw,1.8rem)] font-normal tracking-[-0.01em] leading-[1.3]">
                {tool.names.map((name, j) => (
                  <span key={j}>
                    {j > 0 && <span className="text-border mx-[0.3em] font-normal"> / </span>}
                    {name}
                  </span>
                ))}
              </p>
              <p className="text-[0.9rem] text-muted font-body font-light leading-[1.8]">
                {tool.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
