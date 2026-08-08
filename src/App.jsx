import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-primary">
      <Navbar />

      <main className="flex-1">
        <Hero />
        {/* Sobre, Habilidades, Projetos e Contato serão implementados
            nas próximas etapas, uma a uma. */}
      </main>

      <Footer />
    </div>
  )
}

export default App
