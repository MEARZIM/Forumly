'use client'

import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { usePrevious } from '@mantine/hooks'
import { useMutation } from '@tanstack/react-query'
import { CommentVote, VoteType } from '@prisma/client'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'

import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { CommentVoteRequest } from '@/validators'
import { useLoginToast } from '@/hooks/use-login-toast'

interface CommentVotesProps {
    commentId: string
    votesAmt: number
    currentVote?: PartialVote
}

type PartialVote = Pick<CommentVote, 'type'>

const CommentVotes = ({
    commentId,
    votesAmt: _votesAmt,
    currentVote: _currentVote,
}: CommentVotesProps) => {
    const { loginToast } = useLoginToast()
    const [isMounted, setIsMounted] = useState(false)
    const [votesAmt, setVotesAmt] = useState<number>(_votesAmt)
    const [currentVote, setCurrentVote] = useState<PartialVote | undefined>(
        _currentVote
    )
    const prevVote = usePrevious(currentVote)

    const { mutate: vote } = useMutation({
        mutationFn: async (type: VoteType) => {
            const payload: CommentVoteRequest = {
                voteType: type,
                commentId,
            }

            await axios.patch('/api/subforum/posts/comment/vote', payload)
        },
        onError: (err, voteType) => {
            if (voteType === 'UP') setVotesAmt((prev) => prev - 1)
            else setVotesAmt((prev) => prev + 1)

            // reset current vote
            setCurrentVote(prevVote)

            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return loginToast()
                }
            }

            return toast({
                title: 'Something went wrong.',
                description: 'Your vote was not registered. Please try again.',
                variant: 'destructive',
            })
        },
        onMutate: (type: VoteType) => {
            if (currentVote?.type === type) {
                // User is voting the same way again, so remove their vote
                setCurrentVote(undefined)
                if (type === 'UP') setVotesAmt((prev) => prev - 1)
                else if (type === 'DOWN') setVotesAmt((prev) => prev + 1)
            } else {
                // User is voting in the opposite direction, so subtract 2
                setCurrentVote({ type })
                if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1))
                else if (type === 'DOWN')
                    setVotesAmt((prev) => prev - (currentVote ? 2 : 1))
            }
        },
    })

    useEffect(() => {
        setIsMounted(true)
    },[]);

    if(!isMounted) {
        return null
    }

    return (
        <div className='flex gap-1'>
            {/* upvote */}
            <Button
                onClick={() => vote('UP')}
                size='sm'
                variant='ghost'
                aria-label='upvote'>
                <ArrowBigUp
                    className={cn('h-5 w-5 text-zinc-700', {
                        'text-emerald-500 fill-emerald-500': currentVote?.type === 'UP',
                    })}
                />
            </Button>

            {/* score */}
            <p className='text-center py-2 px-1 font-medium text-xs text-zinc-900'>
                {votesAmt}
            </p>

            {/* downvote */}
            <Button
                onClick={() => vote('DOWN')}
                size='sm'
                className={cn({
                    'text-emerald-500': currentVote?.type === 'DOWN',
                })}
                variant='ghost'
                aria-label='downvote'>
                <ArrowBigDown
                    className={cn('h-5 w-5 text-zinc-700', {
                        'text-red-500 fill-red-500': currentVote?.type === 'DOWN',
                    })}
                />
            </Button>
        </div>
    )
}

export default CommentVotes