import * as React from 'react'
import { notFound } from 'next/navigation'

import { db } from '@/lib/db'
import { getAuthSession } from '@/auth'
import { INFINITE_SCROLL_PAGINATION_NUMBER } from '@/config'

const CommunityPage = async ({ 
    params 
}: {
    params: {
        slug: string
    }
}) => {

    const session = await getAuthSession()

    const { slug } = await params;

    const subForum = await db.subforum.findFirst({
        where: { 
            name: slug 
        },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                    comments: true,
                    subForum: true
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: INFINITE_SCROLL_PAGINATION_NUMBER,
            },
        },
    })

    if (!subForum) {
        return notFound()
    }

    return (
        <>
            <h1 className='font-bold text-3xl md:text-4xl h-14'>
                r/{subForum.name}
            </h1>
        </>
    )
}

export default CommunityPage
