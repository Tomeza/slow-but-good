import Hero from '@/components/Hero'
import Divider from '@/components/Divider'
import About from '@/components/About'
import Tools from '@/components/Tools'
import Writing from '@/components/Writing'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Tools />
      <Divider />
      <Writing />
      <Divider />
      <ContactForm />
      <Divider />
      <Footer />
    </main>
  )
}
