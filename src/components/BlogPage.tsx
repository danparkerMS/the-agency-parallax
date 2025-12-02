import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Article, ArrowLeft, Clock, User } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { ParallaxHero } from './ParallaxHero'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
}

export function BlogPage() {
  const [posts = []] = useKV<BlogPost[]>('blog-posts', [])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground py-8 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              className="mb-6 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
              onClick={() => setSelectedPost(null)}
            >
              <ArrowLeft className="mr-2" />
              Back to Blog
            </Button>
            
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-accent text-accent-foreground">{selectedPost.category}</Badge>
              {selectedPost.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="border-primary-foreground/20 text-primary-foreground">
                  {tag}
                </Badge>
              ))}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              {selectedPost.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 text-primary-foreground/80"
            >
              <div className="flex items-center gap-2">
                <User size={20} />
                <span>{selectedPost.author}</span>
              </div>
              <Separator orientation="vertical" className="h-4 bg-primary-foreground/20" />
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{selectedPost.readTime}</span>
              </div>
              <Separator orientation="vertical" className="h-4 bg-primary-foreground/20" />
              <span>{selectedPost.date}</span>
            </motion.div>
          </div>
        </div>

        <div className="py-16 px-6 md:px-12 lg:px-24">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="prose prose-lg max-w-none">
              <div className="h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-12 flex items-center justify-center">
                <Article size={80} className="text-accent" weight="fill" />
              </div>

              <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </div>
            </div>

            <Separator className="my-12" />

            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
              {selectedPost.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button
                size="lg"
                variant="outline"
                onClick={() => setSelectedPost(null)}
              >
                <ArrowLeft className="mr-2" />
                Back to All Posts
              </Button>
            </div>
          </motion.article>
        </div>
      </div>
    )
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
          <Article size={64} className="text-accent mx-auto mb-6" weight="fill" />
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Our Blog
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Insights, stories, and perspectives from our team and community
          </p>
        </motion.div>
      </ParallaxHero>

      <section className="py-24 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Article size={64} className="text-muted-foreground mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">No Posts Yet</h2>
              <p className="text-lg text-muted-foreground">
                Check back soon for new articles and insights
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Latest Articles</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore our collection of articles, insights, and thought leadership
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card 
                      className="h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                      onClick={() => setSelectedPost(post)}
                    >
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Article size={48} className="text-accent" weight="fill" />
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-accent text-accent-foreground">
                            {post.category}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader>
                        <h3 className="text-xl font-semibold line-clamp-2 mb-3 group-hover:text-accent transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User size={16} />
                          <span>{post.author}</span>
                          <Separator orientation="vertical" className="h-3" />
                          <span>{post.date}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1">
                        <p className="text-muted-foreground line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock size={16} />
                          <span>{post.readTime}</span>
                        </div>
                      </CardContent>

                      <CardFooter className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
