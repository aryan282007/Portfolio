import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Root application component that assembles the primary portfolio sections.
// Each child component represents a distinct page section or reusable UI block.
export default function App() {
  return (
    <div className="min-h-screen bg-base-bg">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
