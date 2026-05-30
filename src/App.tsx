import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import HowItWorks from './components/HowItWorks'
import UseCases from './components/UseCases'
import Metrics from './components/Metrics'
import Team from './components/Team'
import Differentiators from './components/Differentiators'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Demo from './demo/Demo'

function App() {
  const [showDemo, setShowDemo] = useState(() => window.location.hash === '#demo')

  useEffect(() => {
    const onHashChange = () => setShowDemo(window.location.hash === '#demo')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showDemo ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showDemo])

  const closeDemo = () => {
    if (window.location.hash === '#demo') {
      window.history.pushState('', document.title, window.location.pathname + window.location.search)
    }
    setShowDemo(false)
  }

  return (
    <div className="min-h-screen bg-[#f8f8f4] text-[#07120f]">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <UseCases />
      <Metrics />
      <Differentiators />
      <Team />
      <CTA />
      <Footer />
      {showDemo && <Demo onClose={closeDemo} />}
    </div>
  )
}

export default App
