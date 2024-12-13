"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { motion } from "framer-motion"

const VoteSection = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div>
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

            {/* Floating animated bubbles */}


            {/* Content Section */}
            <div className="container mx-auto px-6 py-16 md:py-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Vote Text Content */}
                    <div className="max-w-2xl">
                        <motion.h1
                            className="text-6xl md:text-8xl font-extrabold text-blue-900 mb-6 leading-tight tracking-tight"
                            animate={{ y: [0, -10, 0], letterSpacing: ["-0.03em", "-0.01em", "-0.03em"] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            Shape the Conversation: Vote for the Best Content!
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-2xl text-zinc-500 leading-relaxed mb-8"
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            Forumly’s voting system empowers the community to upvote or downvote posts and comments. The most engaging and interesting content rises to the top, while less relevant material sinks down. Users help curate the quality of the content by voting, ensuring that valuable discussions and insights are given the attention they deserve. This democratic system fosters a platform where the voice of the community truly shapes the content, keeping discussions vibrant and relevant.
                        </motion.p>
                    </div>

                    {/* Image on Right */}
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
                                src="/vote.png"  // Replace with the path to your image
                                alt="Forumly Vote"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default VoteSection;
