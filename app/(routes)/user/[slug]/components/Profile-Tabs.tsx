import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowBigDown, ArrowBigUp, MessageSquare, Share2 } from 'lucide-react'

const ProfileTabs = () => {
    return (
        <>
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none">
                    <TabsTrigger
                        value="overview"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-4 py-2"
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="posts"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-4 py-2"
                    >
                        Posts
                    </TabsTrigger>
                    <TabsTrigger
                        value="comments"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-4 py-2"
                    >
                        Comments
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6 space-y-6">
                    <Card className="p-4 bg-white dark:bg-orange-900 shadow rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <Avatar>
                                <AvatarImage src="/placeholder.svg" alt="Subreddit" />
                                <AvatarFallback>SB</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">r/BollyBlindsNGossip</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Posted by u/Rast987 • 1h ago</p>
                            </div>
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Kapoor Family Meets PM Modi</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">Too old. Health issues</p>
                        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                            <Button variant="ghost" size="sm" className="hover:bg-orange-100 dark:hover:bg-orange-800">
                                <ArrowBigUp className="w-4 h-4 mr-1" />
                                1
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-orange-100 dark:hover:bg-orange-800">
                                <ArrowBigDown className="w-4 h-4 mr-1" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-orange-100 dark:hover:bg-orange-800">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Reply
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-orange-100 dark:hover:bg-orange-800">
                                <Share2 className="w-4 h-4 mr-1" />
                                Share
                            </Button>
                        </div>
                    </Card>
                    <Card className="p-4 bg-white dark:bg-orange-900 shadow rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <Avatar>
                                <AvatarImage src="/placeholder.svg" alt="Subreddit" />
                                <AvatarFallback>SB</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">r/BollyBlindsNGossip</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Posted by u/Rast987 • 2h ago</p>
                            </div>
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Kapoor Family is Royalty of Bollywood and it shows ----</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">Raj Kapoor was not famous for doing theatre but for the films he directed and acted in. Who Produced those films is irrelevant, what is relevant is who directed them. Ppl went to watch the Raj Kapoor directed film, not the RK Studios produced film. You should check the verdict of the that last 1999 RK Studios produced film to check whether I am saying the truth or not</p>
                        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                            <Button variant="ghost" size="sm" className="hover:bg-orange-100 dark:hover:bg-orange-800">
                                <ArrowBigUp className="w-4 h-4 mr-1" />
                                1
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-orange-100 dark:hover:bg-orange-800">
                                <ArrowBigDown className="w-4 h-4 mr-1" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-orange-100 dark:hover:bg-orange-800">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Reply
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-orange-100 dark:hover:bg-orange-800">
                                <Share2 className="w-4 h-4 mr-1" />
                                Share
                            </Button>
                        </div>
                    </Card>
                </TabsContent>
                <TabsContent value="posts" className="mt-6">
                    <Card className="p-4 bg-white dark:bg-orange-900 shadow rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300">Posts content goes here...</p>
                    </Card>
                </TabsContent>
                <TabsContent value="comments" className="mt-6">
                    <Card className="p-4 bg-white dark:bg-orange-900 shadow rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300">Comments content goes here...</p>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}

export default ProfileTabs
