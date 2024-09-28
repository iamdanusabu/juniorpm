'use client'

import { useEffect, useRef, useState, Fragment } from 'react'
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Phone, Download, ChevronRight, Code, PenTool, BarChart, Users, Lightbulb, Trello } from 'lucide-react'
import Image from 'next/image'

const ParallaxCard = ({ children, index }) => {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, -50 * (index + 1)])

  return (
    <motion.div ref={cardRef} style={{ y }}>
      {children}
    </motion.div>
  )
}

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const TimelineItem = ({ job, index, isLeft }) => {
  return (
    <div className={`mb-20 flex justify-between items-center w-full ${isLeft ? 'flex-row-reverse' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="w-5/12"
      >
        <Card className="px-6 py-4 relative shadow-md border-t-2 border-blue-600 bg-white dark:bg-gray-800">
          <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-1 h-full bg-blue-600`}></div>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">{job.title}</CardTitle>
            <CardDescription className="text-sm font-medium text-blue-600 dark:text-blue-400">{job.company} | {job.period}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              {job.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

const ProfessionalJourney = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const jobs = [
    {
      title: "Product Manager",
      company: "ESSI Integrated Technologies",
      period: "Mar. 2024 – Present",
      description: [
        "Led cross-functional teams to develop VMS and 3D UVSS",
        "Conducted user research with over 100 participants",
        "Implemented Agile methodologies, reducing project delivery time by 20%",
        "Developed strategic Product Roadmaps, increasing customer satisfaction by 10%"
      ]
    },
    {
      title: "Product Management Intern",
      company: "Associate Product Manager",
      period: "Nov. 2023 – Feb. 2024",
      description: [
        "Conducted user research, analyzing over 100 user reviews",
        "Created 20+ user stories and detailed product documentation",
        "Developed 30+ detailed wireframes, reducing design iteration time by 20%"
      ]
    },
    {
      title: "Student Researcher",
      company: "College of Engineering Karunagapally",
      period: "Jan. 2023 – Oct. 2023",
      description: [
        "Conducted research on emerging technologies in product management",
        "Presented findings at two college symposiums",
        "Collaborated with faculty on a paper about AI in product development"
      ]
    }
  ]

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const updateConnectors = () => {
      const timeline = containerRef.current
      const items = timeline.querySelectorAll('.mb-24')
      items.forEach((item, index) => {
        const card = item.querySelector('.shadow-lg')
        const connector = timeline.querySelector(`.connector-${index}`)
        const circle = timeline.querySelector(`.circle-${index}`)
        
        if (card && connector && circle) {
          const cardRect = card.getBoundingClientRect()
          const timelineRect = timeline.getBoundingClientRect()
          const circleRect = circle.getBoundingClientRect()

          const isLeft = index % 2 === 0
          const startX = isLeft ? circleRect.left - timelineRect.left : circleRect.right - timelineRect.left
          const endX = isLeft ? cardRect.right - timelineRect.left : cardRect.left - timelineRect.left
          const width = Math.abs(endX - startX)

          connector.style.width = `${width}px`
          connector.style.left = isLeft ? `${startX}px` : `${endX}px`
        }
      })
    }

    updateConnectors()
    window.addEventListener('resize', updateConnectors)
    return () => window.removeEventListener('resize', updateConnectors)
  }, [])

  return (
    <section id="experience" className="py-20 relative bg-gray-50 dark:bg-gray-900" ref={containerRef}>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">Professional Journey</h2>
      <div className="container mx-auto w-full h-full relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-300 dark:bg-gray-700">
          <motion.div 
            className="w-full bg-blue-600" 
            style={{ height: lineHeight, originY: 0 }}
          />
        </div>
        <div className="relative wrap overflow-hidden p-10 h-full">
          {jobs.map((job, index) => (
            <div key={index} className="relative">
              <TimelineItem 
                job={job} 
                index={index} 
                isLeft={index % 2 === 0} 
              />
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const SkillCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div 
        className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto"
        whileHover={{ 
          scale: 1.1,
          backgroundColor: ["#EBF5FF", "#3B82F6", "#EBF5FF"],
        }}
        transition={{ 
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 text-center">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">{description}</p>
    </motion.div>
  )
}

const Skills = () => {
  const skills = [
    { icon: Code, title: "Web Development", description: "Building responsive and interactive web applications" },
    { icon: PenTool, title: "UI/UX Design", description: "Creating intuitive and visually appealing user interfaces" },
    { icon: BarChart, title: "Data Analysis", description: "Extracting insights from complex datasets" },
    { icon: Users, title: "Team Collaboration", description: "Working effectively in cross-functional teams" },
    { icon: Lightbulb, title: "Problem Solving", description: "Developing innovative solutions to complex challenges" },
    { icon: Trello, title: "Project Management", description: "Planning and executing projects efficiently" },
  ]

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={index} {...skill} />
          ))}
        </div>
      </div>
    </section>
  )
}

const GetInTouch = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Get in Touch</h2>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            I'm always open to new opportunities and collaborations. Feel free to reach out through any of the following channels:
          </p>
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-4" />
              <a href="mailto:your.email@example.com" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                your.email@example.com
              </a>
            </div>
            <div className="flex items-center justify-center">
              <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-4" />
              <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                +1 (234) 567-890
              </a>
            </div>
            <div className="flex items-center justify-center">
              <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-4" />
              <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                LinkedIn Profile
              </a>
            </div>
            <div className="flex items-center justify-center">
              <Github className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-4" />
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const imageAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 shadow-md sticky top-0 z-10 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Danu Sabu</h1>
          <div className="flex space-x-4">
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About</a>
            <a href="#experience" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Experience</a>
            <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Projects</a>
            <a href="#skills" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Skills</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        <section id="about" className="flex flex-col md:flex-row items-center md:items-start gap-8 py-20">
          <div className="md:w-1/2">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Transforming Ideas into <span className="text-blue-600 dark:text-blue-400">Impactful Products</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              As a Junior Product Manager, I blend innovation with user-centric design to create products that make a difference. With a passion for technology and a keen eye for detail, I'm dedicated to driving product success and user satisfaction.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-8 flex items-center justify-center">
              Download CV
              <Download className="ml-2 h-4 w-4 inline-block" />
            </Button>
          </div>
          <motion.div 
            className="md:w-1/2 flex justify-center"
            variants={imageAnimation}
            initial="hidden"
            animate="visible"
          >
            <Image 
              src="/images/profile.png" 
              alt="Product Management Illustration" 
              width={400} 
              height={400} 
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </section>

        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="py-10"
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">About Me</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3 space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  I'm a passionate Junior Product Manager with a strong background in computer science and a keen interest in emerging technologies. My approach combines analytical thinking with creative problem-solving to deliver user-centric products that drive business growth.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  With experience in both startup and enterprise environments, I've developed a versatile skill set that allows me to adapt quickly to new challenges and deliver results in fast-paced, dynamic settings.
                </p>
              </div>
              <div className="md:w-1/3 flex flex-wrap justify-center gap-4">
                <div className="flex flex-col items-center">
                  <Code className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm mt-2">Development</span>
                </div>
                <div className="flex flex-col items-center">
                  <PenTool className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm mt-2">Design</span>
                </div>
                <div className="flex flex-col items-center">
                  <BarChart className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm mt-2">Analytics</span>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm mt-2">User Research</span>
                </div>
                <div className="flex flex-col items-center">
                  <Lightbulb className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm mt-2">Innovation</span>
                </div>
                <div className="flex flex-col items-center">
                  <Trello className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm mt-2">Agile</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <ProfessionalJourney />

        <motion.section 
          id="projects"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="py-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600 dark:text-blue-400">Visitor Management System (VMS)</CardTitle>
                <CardDescription>ESSI Integrated Technologies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Led the development of a comprehensive VMS, integrating RFID and facial recognition technologies.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>Reduced manual pass creation time by 40%</li>
                  <li>Increased passes processed per hour by 35%</li>
                  <li>Improved operational efficiency by 25%</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600 dark:text-blue-400">Movie Ticket System</CardTitle>
                <CardDescription>College Project</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Developed a user-friendly movie ticket reservation system for college festivals.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>90 students used the platform</li>
                  <li>Achieved 85% user satisfaction rating</li>
                  <li>Implemented wait-list management for high-demand screenings</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <Skills />

        <GetInTouch />
      </main>

      <footer className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 shadow-md mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-600 dark:text-gray-300">
          © 2024 Danu Sabu. All rights reserved.
        </div>
      </footer>
    </div>
  )
}