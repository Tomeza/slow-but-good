import SectionLabel from './SectionLabel'
import ScrollReveal from './ScrollReveal'

export default function Writing() {
  return (
    <section className="px-[8vw] py-32 max-sm:px-[6vw] max-sm:py-20">
      <ScrollReveal>
        <SectionLabel>Writing</SectionLabel>
      </ScrollReveal>
      <ScrollReveal>
        <p className="font-body text-[0.95rem] text-border font-light">
          準備中。ゆっくりですが、書きます。
        </p>
      </ScrollReveal>
    </section>
  )
}
