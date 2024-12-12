import React from 'react'
import { MessageCircle, MoreHorizontal, Plus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Props {
    userData: String
}

const ProfileHeader = ({
    userData
}: Props) => {
    return (
        <>
            <div className="flex flex-col sm:flex-row items-start gap-4">
                <Avatar className="w-16 h-16 bg-yellow-300">
                    <AvatarImage src="/placeholder.svg" alt="Rast987" />
                    <AvatarFallback>R</AvatarFallback>
                </Avatar>
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
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileHeader
