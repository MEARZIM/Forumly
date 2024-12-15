import React from 'react'
import { HeartCrack, MessagesSquare } from 'lucide-react';

import { db } from '@/lib/db';
import { getAuthSession } from '@/auth'
import PostComment from './PostComment';
import CreateComment from './CreateComment';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface Props {
    postId: string
}

const CommentSection = async ({
    postId
}: Props) => {

    const session = await getAuthSession();


    const comments = await db.comment.findMany({
        where: {
            postId: postId,
            // replyToId: null,
        },
        include: {
            author: true,
            votes: true,
            replies: {
                include: {
                    author: true,
                    votes: true,
                },
            },
        },
    });

    return (
        <>
            <div className='flex flex-col gap-y-4 mt-4'>

                <CreateComment postId={postId} />

                <Separator
                    className='w-full my-4 bg-black'
                />

                <div className='flex flex-col gap-y-6 mt-4'>
                    <h1 className={cn(
                        'text-xl flex items-center mb-2 gap-2',
                        comments.length === 0 ? "font-normal text-red-500" : "font-bold  underline"
                    )}>
                        {comments.length === 0 ? (<>
                            No Comments Available
                            <HeartCrack size={20} />
                        </>) : (<>
                            <MessagesSquare size={20} />
                            Previous Comments
                        </>)}
                    </h1>
                    {comments.filter((comment) => !comment.replyToId).map((topLevelComment) => {
                        const topLevelCommentVotesAmt = topLevelComment.votes.reduce((acc, vote) => {
                            if (vote.type === 'UP') return acc + 1
                            if (vote.type === 'DOWN') return acc - 1
                            return acc
                        }, 0)

                        const topLevelCommentVote = topLevelComment.votes.find(
                            (vote) => vote.userId === session?.user.id
                        )


                        return (<>
                            <div key={topLevelComment.id} className='flex flex-col'>
                                <div className='mb-2'>

                                    <PostComment
                                        comment={topLevelComment}
                                        currentVote={topLevelCommentVote}
                                        votesAmt={topLevelCommentVotesAmt}
                                        postId={postId}
                                    />
                                </div>

                                {/* Render replies, Sort replies by most liked*/}
                                {topLevelComment.replies.sort((a, b) => b.votes.length - a.votes.length).map((reply) => {
                                    const replyVotesAmt = reply.votes.reduce((acc, vote) => {
                                        if (vote.type === 'UP') return acc + 1
                                        if (vote.type === 'DOWN') return acc - 1
                                        return acc
                                    }, 0)

                                    const replyVote = reply.votes.find(
                                        (vote) => vote.userId === session?.user.id
                                    )

                                    return (
                                        <div
                                            key={reply.id}
                                            className='ml-2 py-2 pl-4 border-l-2 border-zinc-200'>
                                            <PostComment
                                                comment={reply}
                                                currentVote={replyVote}
                                                votesAmt={replyVotesAmt}
                                                postId={postId}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CommentSection
