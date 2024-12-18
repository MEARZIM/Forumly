import React from 'react'
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { getAuthSession } from '@/auth'
import { Sidebar } from '@/components/layouts/Sidebar';
import CreateCommunity from '@/components/layouts/CreateCommunity';

const SettingsLayoutPage = async ({
    children
}: {
    children: React.ReactNode
}) => {

    const session = await getAuthSession();

    if (!session?.user) {
        redirect('/signUp');
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
        <>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 md:gap-x-2 py-6">
                <div className="col-span-1">
                    <Sidebar
                        resentSubForum={resentSubForum}
                        communitySubForum={communitySubForum}
                    />
                </div>
                <div className="col-span-2">
                    <h1 className='font-bold text-3xl md:text-4xl bg-inherit py-6'>Saved Posts</h1>
                    {children}
                </div>
                <div className="col-span-1">
                    <CreateCommunity />
                </div>
            </div>
        </>
    )
}

export default SettingsLayoutPage
