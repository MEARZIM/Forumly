"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { motion } from "framer-motion"

const CommentSection = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div >

            {/* Content Section */}
            <div className="container mx-auto px-6 py-16 md:py-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image on Left */}
                    <div className="flex justify-center lg:justify-start">
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
                                src="/comment.jpeg"  // Replace with the path to your image
                                alt="Forumly Comment"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </motion.div>
                    </div>

                    {/* Comment Text Content */}
                    <div className="max-w-2xl">
                        <motion.h1
                            className="text-6xl md:text-8xl font-extrabold text-blue-900 mb-6 leading-tight tracking-tight"
                            animate={{ y: [0, -10, 0], letterSpacing: ["-0.03em", "-0.01em", "-0.03em"] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            Engage with Comments on Forumly
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-2xl text-zinc-500 leading-relaxed mb-8"
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            In Forumly, comments are where the real discussions happen. Whether it’s to express an opinion, ask a question, or share a laugh, the community thrives on meaningful and engaging conversations. Users can comment on posts, exchange ideas, and even inject humor, creating a dynamic space for diverse opinions and interactions. Forumly fosters an environment where every voice matters and where conversation is the heart of the community.
                        </motion.p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default CommentSection;
