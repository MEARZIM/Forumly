import { notFound } from 'next/navigation'

import { db } from '@/lib/db'
import { getAuthSession } from '@/auth'
import PostFeed from '@/components/layouts/PostFeed';
import { INFINITE_SCROLL_PAGINATION_NUMBER } from '@/config'

const CustomFeed = async () => {
    const session = await getAuthSession()


    if (!session) {
        return notFound();
    }

    const followedCommunities = await db.subscription.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            subforum: true,
        },
    })

    const posts = await db.post.findMany({
        where: {
            subForum: {
                name: {
                    in: followedCommunities.map((sub) => sub.subforumId),
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            votes: true,
            author: true,
            comments: true,
            subForum: true,
        },
        take: INFINITE_SCROLL_PAGINATION_NUMBER,
    })

    return <PostFeed initialPosts={[]} />
}

export default CustomFeed