"use client"

import React from 'react'
import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import IntroSection from './components/IntroSection'
import PostSection from './components/PostSection'
import CommentSection from './components/CommentSection'
import VoteSection from './components/VoteSection'
import StatsSection from './components/StatsSection'
import Footer from './components/Footer'


const Page = () => {
   

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <>
            <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen relative overflow-hidden">
                {/* Subtle grid background */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

                {/* Floating animated bubbles */}
                <div className="absolute inset-0">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-white/40 shadow-xl backdrop-blur-md"
                            style={{
                                width: Math.random() * 90 + 50,
                                height: Math.random() * 90 + 50,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, 25, 0],
                                opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                                duration: 10 + Math.random() * 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-6 py-16 md:py-32 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="max-w-2xl">
                            <motion.h1
                                className="text-6xl md:text-8xl font-extrabold text-blue-900 mb-6 leading-tight tracking-tight"
                                animate={{ y: [0, -10, 0], letterSpacing: ["-0.03em", "-0.01em", "-0.03em"] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                Explore
                                <motion.span
                                    className="block text-blue-800"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                >
                                    Learn Conquer
                                </motion.span>
                            </motion.h1>
                            <motion.p
                                className="text-lg md:text-2xl text-zinc-500 leading-relaxed mb-8"
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                Discover a world of communities, ideas, and endless conversations. Connect, engage, and thrive with Forumly.
                            </motion.p>
                            <div className="flex flex-col sm:flex-row gap-4">
                            </div>
                        </div>

                        {/* Mascot/Illustration */}
                        <div className="flex justify-center lg:justify-end">
                            <motion.div
                                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px]"
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 3, 0, -3, 0],
                                }}
                                transition={{
                                    y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { duration: 16, repeat: Infinity, ease: "easeInOut" },
                                }}
                            >
                                <Image
                                    src="/forumly-mascot-update.png"
                                    alt="Forumly Mascot"
                                    fill

                                    priority
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Gradient Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-500/50 to-transparent"></div>

            </div>
            <IntroSection />
            <PostSection />
            <CommentSection />
            <VoteSection />
            <StatsSection />
            <Footer />
        </>

    )
}

export default Page
