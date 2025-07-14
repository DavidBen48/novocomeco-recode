import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import CEOSection from './components/CEOSection'
import StatsSection from './components/StatsSection'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden w-full">
      <Navbar />
      <Hero />
      <AboutSection />
      <CEOSection />
      <StatsSection />
      <FAQ />
      <Footer />
    </main>
  )
}