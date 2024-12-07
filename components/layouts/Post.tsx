'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { formatTimeToNow } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { Dot, Menu, MessageSquare } from 'lucide-react'
import { Post as UserPost, User, Vote } from '@prisma/client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AlertModal from '@/components/modals/alert-modal'

import EditorOutput from './EditorOutput'


type PartialVote = Pick<Vote, 'type'>

interface PostProps {
  post: UserPost & {
    author: User
    votes: Vote[]
  }
  votesAmount: number
  subforumName: string
  currentVote?: PartialVote
  commentAmt: number
  currentUserId?: string
}

const Post = ({
  post,
  votesAmount: _votesAmount,
  currentVote: _currentVote,
  subforumName,
  commentAmt,
  currentUserId
}: PostProps) => {
  const [open, setOpen] = useState(false);
  const postRef = useRef<HTMLParagraphElement>(null)

  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async () => {
      const payload = { post }
      const { data } = await axios.post('/api/post/delete', payload)
      return data
    },
    onError: () => {
      toast({
        title: 'Post Deletion Failed',
        description: 'Your post was not deleted. Please try again.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      window.location.reload();

      toast({
        title: 'Post Deleted Successfully',
        description: 'Your post has been deleted.',
      })
    },
  })

  const handleDeletePostAction = async () => {
    try {
      // Assuming postId and currentUserId are available in your component
      deletePost()
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  return (<>
    <AlertModal
      isOpen={open}
      onClose={() => setOpen(false)}
      onConfirm={handleDeletePostAction}
      loading={isPending}
    />

    <div className='rounded-md bg-white shadow'>
      <div className='px-6 py-4 flex justify-between'>
        {/* Display post votes */}

        <div className='w-0 flex-1'>
          <div className='max-h-40 flex items-center justify-start mt-1 text-xs text-gray-500'>
            {subforumName ? (
              <>
                <a
                  className='underline text-zinc-900 text-sm underline-offset-2'
                  href={`/community/${subforumName}`}
                >
                  r/{subforumName}
                </a>
                <span className='px-1'><Dot /></span>
              </>
            ) : null}
            <span >
              Posted by
              <a
                className='hover:cursor-pointer pl-1 hover:text-zinc-900'
                href={`/user/${post.author.username}`}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className='hover:underline'>
                      u/{post.author.username}
                    </TooltipTrigger>
                    <TooltipContent>
                      Go to the user page
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

              </a>
            </span>
            <span className='px-1'><Dot /></span>
            {formatTimeToNow(new Date(post.createdAt))}
          </div>

          {/* Title Part */}
          <a href={`/community/${subforumName}/post/${post.id}`}>
            <h1 className='text-lg font-semibold py-2 leading-6 text-gray-900'>
              {post.title}
            </h1>
          </a>

          {/* content part */}
          <div
            className='relative text-sm max-h-40 w-full overflow-clip'
            ref={postRef}
          >
            <EditorOutput content={post.content} />
            {postRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent' />
            ) : null}
          </div>
        </div>
        <div className='hover:cursor-pointer'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='hover:cursor-pointer'>More Info</DropdownMenuItem>
              {currentUserId === post.authorId && (
                //  <DropdownMenuItem>Edit</DropdownMenuItem> 
                <DropdownMenuItem
                  className='hover:cursor-pointer'
                  onClick={() => setOpen(true)}
                >
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>


        </div>
      </div>

      {/* comments */}
      <div className='bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6'>
        <Link
          href={`/community/${subforumName}/post/${post.id}`}
          className='w-fit flex items-center gap-2'>
          <MessageSquare className='h-4 w-4' /> {commentAmt} comments
        </Link>
      </div>
    </div>
  </>
  )
}
export default Post