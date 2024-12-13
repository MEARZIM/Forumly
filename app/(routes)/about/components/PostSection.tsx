"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { motion } from "framer-motion"

const PostSection = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div>
            {/* Content Section */}
            <div className="container mx-auto px-6 py-16 md:py-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Post Text Content */}
                    <div className="max-w-2xl">
                        <motion.h1
                            className="text-6xl md:text-8xl font-extrabold text-blue-900 mb-6 leading-tight tracking-tight"
                            animate={{ y: [0, -10, 0], letterSpacing: ["-0.03em", "-0.01em", "-0.03em"] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            Share and Connect on Forumly
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-2xl text-zinc-500 leading-relaxed mb-8"
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            On Forumly, the community thrives by sharing a variety of content, including stories, articles, images, and videos. Users can express themselves creatively, engage in thought-provoking discussions, and share their passions with others. Whether you are posting a new idea, a personal experience, or something that sparks curiosity, Forumly provides the perfect platform to engage, learn, and grow with others.
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
                                src="/post.webp"  // Replace with the path to your image
                                alt="Forumly Concept"
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

export default PostSection;
