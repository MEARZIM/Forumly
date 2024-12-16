import React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { db } from '@/lib/db'

interface Props {
    username: string
}

const ProfileStatsCard = async ({
    username
}: Props) => {

    const totalPosts = await db.post.count({
        where: {
            author: {
                username: username
            }
        }
    })

    const totalComments = await db.comment.count({
        where: {
            author: {
                username: username
            }
        }
    })

    return (
        <>
            <Card>
                <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="font-bold">{totalPosts}</p>
                            <p className="text-sm text-muted-foreground">Total Posts</p>
                        </div>
                        <div>
                            <p className="font-bold">{totalComments}</p>
                            <p className="text-sm text-muted-foreground">Total Comments</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default ProfileStatsCard
