import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const ProfileModeratorCard = () => {
    return (
        <>
            <Card>
                <CardContent className="p-4">
                    <p className="font-semibold text-base mb-4">MODERATOR OF THESE COMMUNITIES</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className='text-sm'>R</AvatarFallback>
                            </Avatar>
                            <div className='text-sm'>
                                <p className="font-medium">r/RanbirKapoor</p>
                                <p className="text-xs text-muted-foreground">48K members</p>
                            </div>
                            <Button size={"sm"}>Join</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default ProfileModeratorCard
