import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { HomePage } from './components/HomePage'
import { AboutPage } from './components/AboutPage'
import { DonationsPage } from './components/DonationsPage'
import { EventsPage } from './components/EventsPage'
import { ProjectsPage } from './components/ProjectsPage'
import { BlogPage } from './components/BlogPage'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />
      case 'about':
        return <AboutPage />
      case 'donations':
        return <DonationsPage />
      case 'events':
        return <EventsPage />
      case 'projects':
        return <ProjectsPage />
      case 'blog':
        return <BlogPage />
      default:
        return <HomePage onNavigate={setCurrentPage} />
    }
  }

  return (
    <>
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="pt-20">
        {renderPage()}
      </main>
      <Toaster />
    </>
  )
}

export default App
