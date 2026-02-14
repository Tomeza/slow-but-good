export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[0.65rem] tracking-[0.2em] uppercase text-border mb-12">
      {children}
    </p>
  )
}
