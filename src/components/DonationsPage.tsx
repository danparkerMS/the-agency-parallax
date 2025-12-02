import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Heart, ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { ParallaxHero } from './ParallaxHero'
import { toast } from 'sonner'

interface Donation {
  id: string
  title: string
  description: string
  goal: number
  raised: number
  category: string
  image: string
}

export function DonationsPage() {
  const [donations = []] = useKV<Donation[]>('donations', [])
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null)

  const handleDonate = (donation: Donation) => {
    toast.success(`Thank you for supporting "${donation.title}"!`)
  }

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100)
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
          <Heart size={64} className="text-accent mx-auto mb-6" weight="fill" />
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Make a Difference
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Support our causes and help create positive change in communities worldwide
          </p>
        </motion.div>
      </ParallaxHero>

      <section className="py-24 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          {donations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Heart size={64} className="text-muted-foreground mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">No Active Campaigns</h2>
              <p className="text-lg text-muted-foreground">
                Check back soon for new donation opportunities
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
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Active Campaigns</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Every contribution makes a difference. Choose a cause that resonates with you.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {donations.map((donation, index) => (
                  <motion.div
                    key={donation.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card 
                      className="h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                      onClick={() => setSelectedDonation(donation)}
                    >
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <div 
                          className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Heart size={48} className="text-accent" weight="fill" />
                        </div>
                      </div>
                      
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-xl font-semibold line-clamp-2 flex-1">
                            {donation.title}
                          </h3>
                          <Badge variant="secondary">{donation.category}</Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1">
                        <p className="text-muted-foreground mb-6 line-clamp-3">
                          {donation.description}
                        </p>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-accent">
                              ${donation.raised.toLocaleString()} raised
                            </span>
                            <span className="text-muted-foreground">
                              of ${donation.goal.toLocaleString()}
                            </span>
                          </div>
                          <Progress 
                            value={getProgressPercentage(donation.raised, donation.goal)} 
                            className="h-2"
                          />
                          <div className="text-sm text-muted-foreground">
                            {getProgressPercentage(donation.raised, donation.goal).toFixed(0)}% funded
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter>
                        <Button 
                          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDonate(donation)
                          }}
                        >
                          Donate Now
                          <Heart className="ml-2" weight="fill" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {selectedDonation && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDonation(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-3">{selectedDonation.category}</Badge>
                  <h2 className="text-3xl font-bold mb-4">{selectedDonation.title}</h2>
                </div>
              </div>

              <div className="relative h-64 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg mb-6 flex items-center justify-center">
                <Heart size={80} className="text-accent" weight="fill" />
              </div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {selectedDonation.description}
              </p>

              <div className="bg-muted rounded-lg p-6 mb-8">
                <div className="flex justify-between mb-3">
                  <span className="text-2xl font-bold text-accent">
                    ${selectedDonation.raised.toLocaleString()}
                  </span>
                  <span className="text-lg text-muted-foreground">
                    of ${selectedDonation.goal.toLocaleString()} goal
                  </span>
                </div>
                <Progress 
                  value={getProgressPercentage(selectedDonation.raised, selectedDonation.goal)} 
                  className="h-3 mb-2"
                />
                <div className="text-sm text-muted-foreground">
                  {getProgressPercentage(selectedDonation.raised, selectedDonation.goal).toFixed(1)}% of goal reached
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                  size="lg"
                  onClick={() => {
                    handleDonate(selectedDonation)
                    setSelectedDonation(null)
                  }}
                >
                  Donate Now
                  <Heart className="ml-2" weight="fill" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => setSelectedDonation(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
