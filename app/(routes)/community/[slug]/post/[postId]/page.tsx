import { Suspense } from 'react'
import { Dot } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Post, User, Vote } from '@prisma/client'

import { db } from '@/lib/db'
import { redis } from '@/lib/redis'
import { CachedPost } from '@/types/redis'
import { Skeleton } from "@/components/ui/skeleton"
import PostVoteServer from '@/components/layouts/Post-Vote/PostVoteServer'
import EditorOutput from '@/components/layouts/EditorOutput'
import { formatTimeToNow } from '@/lib/utils'
import CommentSection from '@/components/layouts/Comments/CommentSection'
import { Separator } from '@/components/ui/separator'

import { ShareButton } from './components/ShareButton'
import TextToSpeechButton from './components/TextToSpeechButton'
import { LanguageSelector } from './components/LanguageSelector'
import ContentDisplay from './components/ContentDisplay'


interface Props {
    params: Promise<{ postId: string }>
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const page = async ({
    params
}: Props) => {
    const { postId } = await params;

    const cachedPost = (await redis.hgetall(
        `post:${postId}`
    )) as CachedPost

    let post: (Post & {
        votes: Vote[];
        author: User;
    }) | null = null;

    if (!cachedPost) {
        post = await db.post.findFirst({
            where: {
                id: postId,
            },
            include: {
                votes: true,
                author: true,
            },
        })
    }

    if (!post && !cachedPost) {
        return notFound()
    }

    const getData = async () => {
        const posts = await db.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                votes: true,
                SavedPost: true
            },
        })
        return posts;
    }

    return (
        <>
            <div className='h-full flex flex-row items-start justify-between'>
                <Suspense fallback={
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                }>
                    <PostVoteServer
                        postId={post?.id ?? cachedPost.id}
                        getData={getData}
                        classname={'pt-12'}
                    />
                </Suspense>

                <div className='w-[100px] sm:w-full flex-1 bg-white p-4 rounded-sm'>

                    <p className='max-h-40 mt-1 truncate text-xs text-gray-500 flex items-center'>
                        Posted by
                        <a
                            href={`/user/${post?.author.username ?? cachedPost.authorUsername}`}
                            className="ml-1 hover:underline"
                        >
                            u/{post?.author.username ?? cachedPost.authorUsername}
                        </a>
                        <Dot />
                        {formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
                    </p>





                    <div className='flex justify-between items-center'>

                        <h1 className='text-3xl font-bold py-2 leading-6 text-gray-900 '>
                            {post?.title ?? cachedPost.title}
                        </h1>
                        <div className='flex items-center gap-2'>
                            <TextToSpeechButton
                                content={post?.content ?? cachedPost.content}
                            />
                            <ShareButton />

                        </div>
                    </div>


                    <div className='mb-10'>
                        <ContentDisplay
                            content={post?.content ?? cachedPost.content}
                        />
                    </div>

                    <Separator className='bg-black' />

                    <Suspense
                        fallback={
                            <SkeletonCard />
                        }>
                        <CommentSection postId={post?.id ?? cachedPost.id} />
                    </Suspense>
                </div>
            </div>
        </>
    )
}


export default page


function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}