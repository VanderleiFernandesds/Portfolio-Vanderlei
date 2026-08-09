import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-primary">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        {/* Projetos e Contato serão implementados nas próximas etapas. */}
      </main>

      <Footer />
    </div>
  )
}

export default App
