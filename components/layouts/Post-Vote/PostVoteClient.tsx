"use client"

import React, {
    useEffect,
    useState
} from 'react'
import { VoteType } from '@prisma/client'
import axios, { AxiosError } from 'axios'
import { usePrevious } from '@mantine/hooks'
import { useMutation } from '@tanstack/react-query'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'

import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { PostVoteRequest } from '@/validators'
import { Button } from '@/components/ui/button'
import { useLoginToast } from '@/hooks/use-login-toast'


interface Props {
    postId: string
    initialVoteAmmount: number
    initialVote?: VoteType | null
}

const PostVoteClient = ({
    postId,
    initialVoteAmmount,
    initialVote
}: Props) => {
    const { loginToast } = useLoginToast();

    const [currentVote, setCurrentVote] = useState(initialVote);
    const [voteAmmount, setVoteAmmount] = useState<number>(initialVoteAmmount);

    const prevVote = usePrevious(currentVote);

    useEffect(() => {
        setCurrentVote(initialVote)
    }, [initialVote])

    const {
        mutate: vote,
        isPending,
        isSuccess,
    } = useMutation({
        mutationFn: async (type: VoteType) => {
            const payload: PostVoteRequest = {
                voteType: type,
                postId: postId,
            }

            await axios.patch('/api/subforum/posts/vote', payload)
        },
        onError: (err, voteType) => {
            if (voteType === 'UP') {
                setVoteAmmount((prev) => prev - 1)
            } else {
                setVoteAmmount((prev) => prev + 1)
            }

            // reset current vote
            setCurrentVote(prevVote)

            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return loginToast()
                }
            }

            return toast({
                title: 'Something went wrong.',
                description: 'Your vote was not registered. Please try again...',
                variant: 'destructive',
            })
        },
        onMutate: (type: VoteType) => {
            if (currentVote === type) {
                // User is voting the same way again, so remove their vote
                setCurrentVote(undefined)
                if (type === 'UP') {
                    setVoteAmmount((prev) => prev - 1)
                }else if (type === 'DOWN') {
                    setVoteAmmount((prev) => prev + 1)
                }
            } else {
                // User is voting in the opposite direction, so subtract 2
                setCurrentVote(type)
                if (type === 'UP') {
                    setVoteAmmount((prev) => prev + (currentVote ? 2 : 1))
                }
                else if (type === 'DOWN') {
                    setVoteAmmount((prev) => prev - (currentVote ? 2 : 1))
                }
            }
        },
    })


    return (


        <>
            <div className='flex flex-col items-center gap-4 sm:gap-0 px-2 pb-4 sm:pb-0'>
                {/* upvote */}
                <Button
                    onClick={() => vote('UP')}
                    size='icon'
                    variant='ghost'
                    aria-label='upvote'
                    disabled={isPending}
                >
                    <ArrowBigUp
                        className={cn('h-5 w-5 text-zinc-700', {
                            'text-emerald-500 fill-emerald-500': currentVote === 'UP',
                        })}
                    />
                </Button>

                {/* score */}
                <p className='text-center  font-medium text-sm text-zinc-900'>
                    {voteAmmount}
                </p>

                {/* downvote */}
                <Button
                    onClick={() => vote('DOWN')}
                    size='icon'
                    className={cn({
                        'text-emerald-500': currentVote === 'DOWN',
                    })}
                    variant='ghost'
                    aria-label='downvote'
                    disabled={isPending}
                >
                    <ArrowBigDown
                        className={cn('h-5 w-5 text-zinc-700', {
                            'text-red-500 fill-red-500': currentVote === 'DOWN',
                        })}
                    />
                </Button>
            </div>
        </>
    )
}

export default PostVoteClient
