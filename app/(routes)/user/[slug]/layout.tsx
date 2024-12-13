import React from 'react'
import { notFound } from 'next/navigation'

import { db } from '@/lib/db'
import { Sidebar } from '@/components/layouts/Sidebar'
import ProfileStatsCard from './components/Profile-Stats-Card'
import ProfileModeratorCard from './components/Profile-Moderator-Card'
import { getAuthSession } from '@/auth'

const layout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const session = await getAuthSession();
    
    if (!session?.user) {
        return notFound();
    }

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
                        <ProfileStatsCard />
                        <ProfileModeratorCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default layout
