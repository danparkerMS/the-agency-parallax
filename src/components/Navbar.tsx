import { useState, useEffect } from 'react'
import { House, User, Heart, Calendar, FolderOpen, Article, List, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavbarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'about', label: 'About', icon: User },
    { id: 'donations', label: 'Donations', icon: Heart },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'blog', label: 'Blog', icon: Article },
  ]

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId)
    setIsMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-sm shadow-md'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => handleNavClick('home')}
              className="text-2xl font-bold tracking-tight text-foreground hover:text-accent transition-colors"
            >
              THE AGENCY
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      'flex items-center gap-2 text-sm font-medium transition-all relative group',
                      currentPage === item.id
                        ? 'text-accent'
                        : 'text-foreground hover:text-accent'
                    )}
                  >
                    <Icon className="text-current" />
                    {item.label}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 right-0 h-0.5 bg-accent transition-all',
                        currentPage === item.id
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      )}
                    />
                  </button>
                )
              })}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <List />}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative bg-background h-full pt-24 px-6">
            <div className="flex flex-col gap-6">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      'flex items-center gap-4 text-lg font-medium transition-colors py-3',
                      currentPage === item.id
                        ? 'text-accent'
                        : 'text-foreground hover:text-accent'
                    )}
                  >
                    <Icon size={24} className="text-current" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
