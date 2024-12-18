'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DeveloperProps {
    name: string
    image: string
    email: string
    github: string

}

export function DeveloperCard({ name, image, email, github }: DeveloperProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader className="p-0">
                    <motion.div
                        className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"
                        whileHover={{ height: "8rem" }}
                        transition={{ duration: 0.3 }}
                    />
                </CardHeader>
                <CardContent className="p-6 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        <Avatar className="w-24 h-24 border-4 border-white -mt-16 mx-auto mb-4 shadow-lg">
                            <AvatarImage src={image} alt={name} />
                            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                    </motion.div>
                    <motion.h3
                        className="font-semibold text-xl mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {name}
                    </motion.h3>
                    <motion.p
                        className="mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
                            {email}
                        </a>
                    </motion.p>
                    <motion.div
                        className="flex justify-center space-x-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <motion.a
                            href={`https://${github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-500 transition-colors"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </motion.a>

                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

