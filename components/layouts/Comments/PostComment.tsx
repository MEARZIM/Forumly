'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Dot, MessageSquare } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { Comment, CommentVote, User } from '@prisma/client'

import { toast } from '@/hooks/use-toast'
import { CommentRequest } from '@/validators'
import { formatTimeToNow } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { UserAvatar } from '@/components/layouts/UserAvatar'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

import CommentVotes from './CommentVotes'


type ExtendedComment = Comment & {
    votes: CommentVote[]
    author: User
}

interface PostCommentProps {
    comment: ExtendedComment
    votesAmt: number
    currentVote: CommentVote | undefined
    postId: string
}

const PostComment = ({
    comment,
    votesAmt,
    currentVote,
    postId,
}: PostCommentProps) => {
    const { data: session } = useSession();

    const commentRef = useRef<HTMLDivElement>(null);

    const [isReplying, setIsReplying] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState(false)
    const [input, setInput] = useState<string>(`@${comment.author.username} `)

    const router = useRouter()

    useOnClickOutside(commentRef, () => {
        setIsReplying(false)
    })

    const { mutate: postComment, isPending } = useMutation({
        mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
            const payload: CommentRequest = { postId, text, replyToId }

            const { data } = await axios.patch(
                `/api/subforum/posts/comment/`,
                payload
            )
            return data
        },

        onError: () => {
            return toast({
                title: 'Something went wrong.',
                description: "Comment wasn't created successfully. Please try again.",
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            router.refresh()
            setIsReplying(false)
        },
    })

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null
    }

    return (
        <>
            <div ref={commentRef} className='flex flex-col'>
                <div className='mx-2'>

                    <div className='flex items-center'>
                        <UserAvatar
                            user={{
                                name: comment.author.name || null,
                                image: comment.author.image || null,
                            }}
                            className='h-6 w-6'
                        />
                        <div className='ml-2 flex items-center gap-x-1'>
                            <p className='text-sm font-medium text-black hover:cursor-pointer hover:underline'>
                                <a href={`/community/${comment.author.username}`}>
                                    u/{comment.author.username}
                                </a>
                            </p>
                            <Dot />
                            <p className='max-h-40 truncate text-xs text-zinc-500'>
                                {formatTimeToNow(new Date(comment.createdAt))}
                            </p>
                        </div>
                    </div>

                    <p className='text-sm text-zinc-900 mt-2'>{comment.text}</p>
                </div>

                <div className='flex gap-2 items-center'>
                    <CommentVotes
                        commentId={comment.id}
                        votesAmt={votesAmt}
                        currentVote={currentVote}
                    />

                    <Button
                        onClick={() => {
                            if (!session) {
                                return router.push('/signIn')
                            }
                            setIsReplying(true)
                        }}
                        variant='ghost'
                        size='sm'>
                        <MessageSquare className='h-4 w-4 mr-1.5' />
                        Reply
                    </Button>
                </div>

                {isReplying ? (
                    <div className='grid w-full gap-1.5'>
                        <Label
                            htmlFor='comment'
                            className='text-sm font-semibold text-black underline'
                        >
                            Add Comment Thread..
                        </Label>
                        <div className='mt-2'>
                            <Textarea
                                onFocus={(e) =>
                                    e.currentTarget.setSelectionRange(
                                        e.currentTarget.value.length,
                                        e.currentTarget.value.length
                                    )
                                }
                                autoFocus
                                id='comment'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                rows={1}
                                placeholder='What are your thoughts?'
                            />

                            <div className='mt-2 flex justify-end gap-2'>
                                <Button
                                    tabIndex={-1}
                                    variant="destructive"
                                    onClick={() => setIsReplying(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    disabled={isPending}
                                    onClick={() => {
                                        if (!input) return
                                        postComment({
                                            postId,
                                            text: input,
                                            replyToId: comment.replyToId ?? comment.id, // default to top-level comment
                                        })
                                    }}>
                                    Post
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default PostComment