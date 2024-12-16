import React from 'react'

import { db } from '@/lib/db'
import { Sidebar } from '@/components/layouts/Sidebar'
import ProfileStatsCard from './components/Profile-Stats-Card'
import ProfileModeratorCard from './components/Profile-Moderator-Card'
import ChatBox from './components/ChatBox'

const layout = async ({
    children,
    params
}: {
    children: React.ReactNode
    params: Promise<{ slug: string }>
}) => {
    const slug = (await params).slug;

    const resentSubForum = await db.subforum.findMany({
        take: 2,
        orderBy: {
            createdAt: 'desc',
        }
    });

    const communitySubForum = await db.subforum.findMany({
        take: 6,
        orderBy: {
            createdAt: 'asc',
        }
    });



    return (
        <div className="min-h-screen bg-inherit">
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="space-y-2 lg:col-span-1">
                        <Sidebar
                            resentSubForum={resentSubForum}
                            communitySubForum={communitySubForum}
                        />
                    </div>
                    <div className="space-y-2 lg:col-span-2">
                        {children}
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <ProfileStatsCard username={slug} />
                        <ProfileModeratorCard username={slug} />
                        <ChatBox />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default layout
