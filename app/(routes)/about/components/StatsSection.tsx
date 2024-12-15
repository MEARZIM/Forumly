'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Globe, MessageSquare } from 'lucide-react';

const stats = [
    {
        number: '50M+',
        label: 'Daily active users',
        icon: Users,
    },
    {
        number: '120M+',
        label: 'Weekly active users',
        icon: Calendar,
    },
    {
        number: '50K+',
        label: 'Active communities',
        icon: Globe,
    },
    {
        number: '5B+',
        label: 'Posts & comments',
        icon: MessageSquare,
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 70,
            damping: 20,
            duration: 0.8,
        },
    },
};

const iconVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 15 },
};

const StatCard = ({ number, label, icon: Icon, index }: { number: string; label: string; icon: React.ElementType; index: number }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [controls, isInView]);

    return (
        <motion.div
            ref={ref}
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-center transform hover:scale-105 transition-transform duration-500 shadow-lg border border-gray-700 relative overflow-hidden group"
        >
            <motion.div
                className="mb-6 relative z-10"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 * index }}
            >
                <Icon className="w-16 h-16 mx-auto text-blue-400 group-hover:text-blue-300 transition-colors duration-500" />
            </motion.div>
            <motion.h3
                className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-4 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
                {number}
            </motion.h3>
            <motion.p
                className="text-gray-300 text-lg relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
                {label}
            </motion.p>
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl" />
        </motion.div>
    );
};

export default function StatsSection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [controls, isInView]);

    return (
        <section className="py-24 md:py-32 px-4 overflow-hidden relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" ref={containerRef}>
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 opacity-5 animate-pulse-slow" />
            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate={controls}
            >
                <motion.h2
                    className="text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
                    variants={itemVariants}
                >
                    Forumly by the numbers
                </motion.h2>

                <motion.p
                    className="text-2xl md:text-3xl text-center text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed"
                    variants={itemVariants}
                >
                    Forumly is a thriving ecosystem of millions of diverse voices, sharing ideas that shape our world.
                </motion.p>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
                    variants={containerVariants}
                >
                    {stats.map((stat, index) => (
                        <StatCard key={stat.label} {...stat} index={index} />
                    ))}
                </motion.div>

                <motion.div
                    className="text-center"
                    variants={itemVariants}
                >
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-12 py-8 text-xl rounded-full shadow-lg transform hover:scale-110 transition-transform duration-500 relative overflow-hidden group"
                    >
                        <span className="relative z-10">
                            <a href={"/"}>

                                Explore Forumly

                            </a>
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
