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

function App() {
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
    </div>
  )
}

export default App
