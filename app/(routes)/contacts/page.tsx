'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Toaster } from "@/components/ui/toaster"
import { DeveloperCard } from './components/DeveloperCard'
import { ContactForm } from './components/ContactForm'

const developers = [
    {
        name: "Ayan Saha",
        image: "/Ayan.png?height=100&width=100",
        email: "asahaayan@gmail.com.com",
        github: "https://github.com/MEARZIM",

    },
    {
        name: "Ankita Pal",
        image: "/Ankita.png?height=100&width=100",
        email: "ankitapal6112002@gmail.com",
        github: "https://github.com/AnkitaPal-2002",

    },
    {
        name: "Sayani Basu",
        image: "/Sayani.jpeg?height=100&width=100",
        email: "sayanibasu2232@gmail.com",
        github: "https://github.com/Sayanibasu78",

    }
]

export default function ContactsPage() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <div ref={ref} className="min-h-screen overflow-hidden">
            <motion.div
                className="fixed inset-0 bg-gradient-to-b from-blue-100 to-purple-100"
                style={{ y: backgroundY }}
            />
            <div className="relative">
                <div className="container mx-auto px-4 py-16">
                    <motion.h1
                        className="text-6xl font-bold text-center mb-4 text-gray-800"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        style={{ y: textY }}
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        className="text-center text-xl mb-16 text-gray-600"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                    >
                        Meet the talented developers behind Forumly. Feel free to reach out to us with any questions or feedback!
                    </motion.p>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, staggerChildren: 0.2 }}
                    >
                        {developers.map((dev, index) => (
                            <motion.div
                                key={dev.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <DeveloperCard {...dev} />
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div
                        className="max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                    >
                        <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">Send Us a Message</h2>
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

