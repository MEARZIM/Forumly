"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { motion } from 'framer-motion'

const IntroSection = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <>
            <div>
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                {/* Content Section */}
                <div className="container mx-auto px-6 py-16 md:py-32 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Image on Left */}
                        <div className="flex justify-center">
                            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px]">
                                <Image
                                    src="/ForumlyIntro.webp"  // Replace with your image path
                                    alt="Forumly Concept"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Text Content on Right */}
                        <div className="max-w-2xl">


                            <motion.h1
                                className="text-6xl md:text-8xl font-extrabold text-blue-900 mb-6 leading-tight tracking-tight"
                                animate={{ y: [0, -10, 0], letterSpacing: ["-0.03em", "-0.01em", "-0.03em"] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                How Forumly Works
                            </motion.h1>
                            <motion.p
                                className="text-lg md:text-2xl text-zinc-500 leading-relaxed mb-8"
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                Forumly is a platform designed to foster meaningful connections through conversation. Whether you're looking to discuss ideas, share insights, or build lasting relationships, Forumly is your space to connect with like-minded individuals. The platform enables seamless communication across diverse topics, creating a dynamic environment where every voice is heard. Whether you're a casual user or a community leader, Forumly provides the tools and features you need to grow, share, and engage in discussions that matter. Experience the power of conversation with Forumly.
                            </motion.p>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default IntroSection;
