import SectionLabel from './SectionLabel'
import ScrollReveal from './ScrollReveal'

export default function About() {
  return (
    <section className="px-[8vw] py-32 max-sm:px-[6vw] max-sm:py-20">
      <ScrollReveal>
        <SectionLabel>About</SectionLabel>
      </ScrollReveal>
      <div className="max-w-[640px]">
        <ScrollReveal>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-normal mb-10 tracking-[-0.01em]">
            早乙女 貴昭
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className="font-body text-[0.85rem] text-muted font-light mb-10 tracking-[0.02em]">
            有限会社さおとめの事務所
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p className="text-[0.95rem] text-muted leading-[2.2] font-body font-light">
            デザインを30年ほど。道具も環境も時代と一緒に変わりました。今はAIと暮らしています。
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
