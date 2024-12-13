'use client'

import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { MessageSquareQuote } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

import { useLoginToast } from '@/hooks/use-login-toast'
import { CommentRequest } from '@/validators'
import { toast } from '@/hooks/use-toast'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'




interface CreateCommentProps {
    postId: string
    replyToId?: string
}

const CreateComment = ({
    postId,
    replyToId
}: CreateCommentProps) => {
    const [input, setInput] = useState<string>('')
    const router = useRouter()
    const { loginToast } = useLoginToast()

    const { mutate: comment, isPending } = useMutation({
        mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
            const payload: CommentRequest = {
                postId,
                text,
                replyToId
            }

            const { data } = await axios.patch("/api/subforum/posts/comment/",
                payload
            )
            return data
        },

        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return loginToast();
                }
            }

            return toast({
                title: 'Something went wrong.',
                description: "Comment wasn't created successfully.",
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            router.refresh()
            setInput('')
        },
    })

    return (
        <div className='grid w-full gap-1.5'>
            <Label
                htmlFor='comment'
                className='font-bold text-lg underline flex items-center gap-2'
            >

                <MessageSquareQuote size={20} />
                Add your comment
            </Label>
            <div className='mt-2'>
                <Textarea
                    id='comment'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={2}
                    placeholder='Write your thoughts..'
                />

                <div className='mt-2 flex justify-end'>
                    <Button
                        disabled={input.length === 0 || isPending}
                        onClick={() => comment({
                            postId,
                            text: input,
                            replyToId
                        })}
                    >
                        Post
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateComment