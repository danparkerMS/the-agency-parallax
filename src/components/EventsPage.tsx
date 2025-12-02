import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock, Users, ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { ParallaxHero } from './ParallaxHero'
import { toast } from 'sonner'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  capacity: number
  registered: number
  details: string
}

export function EventsPage() {
  const [events = []] = useKV<Event[]>('events', [])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const handleRegister = (event: Event) => {
    toast.success(`You've registered for "${event.title}"!`)
    setSelectedEvent(null)
  }

  const getAvailableSpots = (event: Event) => {
    return event.capacity - event.registered
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
          <Calendar size={64} className="text-accent mx-auto mb-6" weight="fill" />
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Upcoming Events
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Join us for inspiring gatherings, workshops, and networking opportunities
          </p>
        </motion.div>
      </ParallaxHero>

      <section className="py-24 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          {events.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Calendar size={64} className="text-muted-foreground mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">No Upcoming Events</h2>
              <p className="text-lg text-muted-foreground">
                Check back soon for new events and opportunities
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
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Us</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover exciting events designed to inspire, connect, and educate
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card 
                      className="h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Calendar size={48} className="text-accent" weight="fill" />
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-accent text-accent-foreground">
                            {event.category}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader>
                        <h3 className="text-xl font-semibold line-clamp-2 mb-3">
                          {event.title}
                        </h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 flex flex-col justify-end">
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm mb-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users size={16} />
                            <span>{event.registered} registered</span>
                          </div>
                          {getAvailableSpots(event) > 0 ? (
                            <Badge variant="secondary">
                              {getAvailableSpots(event)} spots left
                            </Badge>
                          ) : (
                            <Badge variant="destructive">Sold Out</Badge>
                          )}
                        </div>

                        <Button 
                          className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedEvent(event)
                          }}
                        >
                          View Details
                          <ArrowRight className="ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Badge className="bg-accent text-accent-foreground mb-3">
                      {selectedEvent.category}
                    </Badge>
                    <DialogTitle className="text-3xl font-bold">
                      {selectedEvent.title}
                    </DialogTitle>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <Calendar size={80} className="text-accent" weight="fill" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Calendar size={24} className="text-accent" />
                        <div>
                          <div className="text-sm text-muted-foreground">Date</div>
                          <div className="font-semibold">{selectedEvent.date}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Clock size={24} className="text-accent" />
                        <div>
                          <div className="text-sm text-muted-foreground">Time</div>
                          <div className="font-semibold">{selectedEvent.time}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <MapPin size={24} className="text-accent" />
                        <div>
                          <div className="text-sm text-muted-foreground">Location</div>
                          <div className="font-semibold">{selectedEvent.location}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Users size={24} className="text-accent" />
                        <div>
                          <div className="text-sm text-muted-foreground">Availability</div>
                          <div className="font-semibold">
                            {getAvailableSpots(selectedEvent)} / {selectedEvent.capacity} spots
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">About This Event</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {selectedEvent.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedEvent.details}
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  {getAvailableSpots(selectedEvent) > 0 ? (
                    <Button 
                      className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                      size="lg"
                      onClick={() => handleRegister(selectedEvent)}
                    >
                      Register Now
                      <ArrowRight className="ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      className="flex-1"
                      size="lg"
                      disabled
                    >
                      Event Full
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={() => setSelectedEvent(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
