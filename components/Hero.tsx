export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-[8vw] py-16 max-sm:px-[6vw] max-sm:py-12 relative">
      <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] font-light tracking-[-0.02em] leading-[1.05] text-fg mb-10 animate-fade-up animate-fade-up-delay-1">
        slow but good
      </h1>
      <p className="font-display text-[clamp(1.1rem,2.2vw,1.6rem)] font-normal italic text-muted tracking-[0.01em] leading-[1.5] animate-fade-up animate-fade-up-delay-2">
        Good things take time. I take more.
      </p>
      <p className="inline-block mt-6 font-display text-[clamp(0.75rem,1.2vw,0.95rem)] italic text-accent tracking-[0.05em] pl-8 relative animate-fade-up animate-fade-up-delay-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-5 before:h-px before:bg-accent">
        for you.
      </p>
      <span className="absolute bottom-12 right-[8vw] font-display text-[0.7rem] tracking-[0.15em] uppercase text-border writing-vertical-rl animate-fade-in-delay max-sm:hidden"
        style={{ writingMode: 'vertical-rl' }}
      >
        scroll
      </span>
    </section>
  )
}
