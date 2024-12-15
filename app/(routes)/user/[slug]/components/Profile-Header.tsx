"use client"

import React from 'react'
import { Menu, MessageCircle, Plus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { useSidebar } from '@/hooks/use-sidebar'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Props {
    userData: string
}

const ProfileHeader = ({
    userData
}: Props) => {
    const sidebar = useSidebar();
    return (
        <>
            <div className="flex flex-row bg-inherit items-center justify-between gap-4">
                <div>
                    <div className='pb-2'>
                        <Avatar className="w-16 h-16 bg-yellow-300">
                            {/* <AvatarImage src="/placeholder.svg" alt="Rast987" /> */}
                            <AvatarFallback className='bg-white'>
                                {userData.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold">{userData}</h1>
                                <p className="text-sm text-muted-foreground">u/{userData}</p>
                            </div>
                            <div className="flex gap-2 mt-2 sm:mt-0">
                                <Button className="flex-1 sm:flex-none">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Follow
                                </Button>
                                <Button variant="secondary" className="flex-1 sm:flex-none">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Chat
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {/* Open Sidebar Button for Mobile */}
                    <div className="p-4 lg:hidden">
                        <Button variant="ghost" size={"icon"} onClick={sidebar.onOpen} className="flex justify-center items-center">
                            <Menu className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileHeader
