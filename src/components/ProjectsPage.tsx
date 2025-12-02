import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FolderOpen, ArrowRight, CheckCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { ParallaxHero } from './ParallaxHero'

interface Project {
  id: string
  title: string
  description: string
  category: string
  status: 'completed' | 'ongoing' | 'upcoming'
  year: string
  client: string
  details: string
  outcomes: string[]
}

export function ProjectsPage() {
  const [projects = []] = useKV<Project[]>('projects', [])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))]

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-700 border-green-500/20'
      case 'ongoing':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20'
      case 'upcoming':
        return 'bg-purple-500/10 text-purple-700 border-purple-500/20'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen">
      <ParallaxHero height="h-[50vh]" speed={0.3}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6"
        >
          <FolderOpen size={64} className="text-accent mx-auto mb-6" weight="fill" />
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Our Projects
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Discover our portfolio of successful initiatives and transformative work
          </p>
        </motion.div>
      </ParallaxHero>

      <section className="py-24 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <FolderOpen size={64} className="text-muted-foreground mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">No Projects Yet</h2>
              <p className="text-lg text-muted-foreground">
                Check back soon to see our latest work
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                  <TabsList className="w-full justify-start flex-wrap h-auto gap-2 bg-transparent">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground capitalize"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card 
                      className="h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <div className="w-full h-full bg-gradient-to-br from-accent/20 to-secondary/20 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FolderOpen size={48} className="text-accent" weight="fill" />
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge className={getStatusColor(project.status)} variant="outline">
                            {project.status}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary">{project.category}</Badge>
                        </div>
                      </div>

                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-xl font-semibold line-clamp-2 flex-1">
                            {project.title}
                          </h3>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {project.client} • {project.year}
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1">
                        <p className="text-muted-foreground line-clamp-3">
                          {project.description}
                        </p>
                      </CardContent>

                      <CardFooter>
                        <Button 
                          className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedProject(project)
                          }}
                        >
                          View Case Study
                          <ArrowRight className="ml-2" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-lg text-muted-foreground">
                    No projects found in this category
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-background rounded-lg max-w-4xl w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{selectedProject.category}</Badge>
                    <Badge className={getStatusColor(selectedProject.status)} variant="outline">
                      {selectedProject.status}
                    </Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedProject.title}</h2>
                  <div className="text-lg text-muted-foreground">
                    {selectedProject.client} • {selectedProject.year}
                  </div>
                </div>
              </div>

              <div className="relative h-80 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg mb-8 flex items-center justify-center">
                <FolderOpen size={100} className="text-accent" weight="fill" />
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Project Overview</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-3">Details</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.details}
                  </p>
                </div>

                {selectedProject.outcomes.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Key Outcomes</h3>
                    <div className="space-y-3">
                      {selectedProject.outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle size={24} className="text-accent flex-shrink-0 mt-0.5" weight="fill" />
                          <p className="text-muted-foreground">{outcome}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button 
                variant="outline"
                size="lg"
                onClick={() => setSelectedProject(null)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
