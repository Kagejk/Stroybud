import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Advantages from './components/Advantages'
import WorkSteps from './components/WorkSteps'
import BeforeAfter from './components/BeforeAfter'
import LeadBanner from './components/LeadBanner'
import FAQ from './components/FAQ'
import Projects from './components/Projects'
import Footer from './components/Footer'
import LeadModal from './components/LeadModal'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-brand-dark">
      <Header onOpenModal={() => setModalOpen(true)} />
      <main>
        <Hero onOpenModal={() => setModalOpen(true)} />
        <About />
        <Services />
        <Advantages />
        <WorkSteps />
        <BeforeAfter />
        <LeadBanner />
        <FAQ />
        <Projects />
        <LeadBanner
          heading="Готові розпочати свій проєкт?"
          sub="Залиште контакти — виїдемо, заміряємо та надамо кошторис безкоштовно."
        />
      </main>
      <Footer />
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceName="CTA кнопка"
      />
    </div>
  )
}
