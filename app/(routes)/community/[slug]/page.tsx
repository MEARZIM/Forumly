import * as React from 'react'
import { notFound } from 'next/navigation'

import { db } from '@/lib/db'
import { getAuthSession } from '@/auth'
import PostFeed from '@/components/layouts/PostFeed'
import { INFINITE_SCROLL_PAGINATION_NUMBER } from '@/config'
import { MiniCreatePost } from '@/components/layouts/MiniCreatePost'

const CommunityPage = async ({
    params
}: {
    params: {
        slug: string
    }
}) => {

    const session = await getAuthSession()

    const { slug } = await params;

    const subforum = await db.subforum.findFirst({
        where: {
            name: slug
        },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                    comments: true,
                    subForum: true,
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: INFINITE_SCROLL_PAGINATION_NUMBER,
            },
        },
    })
    

    if (!subforum) {
        return notFound()
    }

    return (

        <>
            <h1 className='font-bold text-3xl md:text-4xl h-14 mx-2'>
                r/{subforum.name}
            </h1>
            <MiniCreatePost session={session} />
            {/* Dispaly post */}
            <PostFeed
                initialPosts={subforum.posts}
                subforumName={subforum.name}
            />
        </>
    )
}

export default CommunityPage
