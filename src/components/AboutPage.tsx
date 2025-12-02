import { ParallaxHero } from './ParallaxHero'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Target, Eye, Heart, CheckCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

export function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We pursue the highest standards in everything we do, never settling for good enough.',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Open communication and honest relationships build trust with our clients and partners.',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Ethical practices and principled decisions guide our every action and commitment.',
    },
  ]

  const timeline = [
    { year: '2008', event: 'Agency Founded', description: 'Started with a vision to transform businesses' },
    { year: '2012', event: 'First Major Milestone', description: 'Expanded to 20+ team members and 100+ clients' },
    { year: '2016', event: 'Global Expansion', description: 'Opened offices in three continents' },
    { year: '2020', event: 'Digital Innovation', description: 'Launched cutting-edge digital solutions platform' },
    { year: '2024', event: 'Sustainable Future', description: 'Committed to carbon-neutral operations' },
  ]

  const achievements = [
    'Industry Leader Award 2023',
    'Best Workplace Culture 2022',
    'Innovation Excellence Award 2021',
    'Client Satisfaction Leader 2020-2024',
  ]

  return (
    <div className="min-h-screen">
      <ParallaxHero height="h-[60vh]" speed={0.4}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            About The Agency
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Pioneering excellence in professional services since 2008
          </p>
        </motion.div>
      </ParallaxHero>

      <section className="py-24 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 2008, The Agency began with a simple mission: to help organizations 
                achieve their full potential through innovative strategies and dedicated partnership.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Over the years, we've grown from a small team of passionate professionals into a 
                globally recognized leader in our field. Our success is built on the success of our 
                clients, and we're proud to have played a part in hundreds of transformative journeys.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg p-12 text-center"
            >
              <div className="text-6xl font-bold text-accent mb-4">15+</div>
              <div className="text-2xl font-semibold mb-2">Years of Excellence</div>
              <Separator className="my-6" />
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-lg text-muted-foreground">Successful Projects</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-8 text-center">
                        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                          <Icon size={40} className="text-accent" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 lg:px-24 bg-muted">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              Key milestones that shaped who we are today
            </p>
          </motion.div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="text-4xl font-bold text-accent">{item.year}</div>
                      </div>
                      <Separator orientation="vertical" className="hidden md:block h-16" />
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2">{item.event}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Award-Winning Excellence
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our commitment to quality and innovation has been recognized by industry leaders 
                and organizations worldwide. These accolades reflect our team's dedication and 
                our clients' trust.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle size={24} className="text-accent flex-shrink-0 mt-1" weight="fill" />
                        <span className="text-lg">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 lg:px-24 bg-primary text-primary-foreground">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Us on Our Mission
          </h2>
          <p className="text-xl text-primary-foreground/90">
            Together, we can achieve extraordinary things and create lasting positive impact.
          </p>
        </motion.div>
      </section>
    </div>
  )
}
