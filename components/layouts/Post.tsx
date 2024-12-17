'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { formatTimeToNow } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { Bookmark, Menu, MessageSquare } from 'lucide-react'
import { Post as UserPost, User, Vote } from '@prisma/client'

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
import PostVoteClient from './Post-Vote/PostVoteClient'
import { Button } from '../ui/button'

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
  initialSavedState?: boolean // New prop to handle initial saved state
}

const Post = ({
  post,
  votesAmount: _votesAmount,
  currentVote: _currentVote,
  subforumName,
  commentAmt,
  currentUserId,
  initialSavedState, // Default false
}: PostProps) => {
  const [open, setOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(initialSavedState) // Track the saved state
  const postRef = useRef<HTMLParagraphElement>(null)

  const { mutate: deletePost, isPending: isPendingDeletePost } = useMutation({
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
      window.location.reload()
      toast({
        title: 'Post Deleted Successfully',
        description: 'Your post has been deleted.',
      })
    },
  })

  const { mutate: toggleSavePost, isPending: isPendingSavePost } = useMutation({
    mutationFn: async () => {
      const payload = { postId: post.id } // Include only necessary fields
      const { data } = await axios.post('/api/post/save', payload)
      return data
    },
    onError: () => {
      toast({
        title: isSaved ? 'Unsave Failed' : 'Save Post Failed',
        description: 'Unable to update save status. Please try again.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      setIsSaved(!isSaved) // Toggle the saved state
      toast({
        title: isSaved ? 'Post Unsaved' : 'Post Saved Successfully',
        description: isSaved
          ? 'This post has been removed from your saved collection.'
          : 'This post has been saved to your collection.',
      })
    },
  })

  const handleDeletePostAction = async () => {
    try {
      deletePost()
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const handleToggleSavePost = () => {
    toggleSavePost()
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDeletePostAction}
        loading={isPendingDeletePost || isPendingDeletePost}
      />

      <div className='rounded-md bg-white shadow'>
        <div className='px-6 py-4 flex justify-between'>
          {/* Display post votes */}
          <PostVoteClient
            postId={post.id}
            initialVote={_currentVote?.type}
            initialVoteAmmount={_votesAmount}
          />

          <div className='w-0 flex-1'>
            <div>
              <a
                href={`/community/${subforumName}`}
                className="font-bold text-gray-900 hover:underline"
              >
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">f/{subforumName}</h3>
              </a>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Posted by
                <a
                  href={`/user/${post.author.username}`}
                  className="ml-1 hover:underline"
                >
                  u/{post.author.username}
                </a>
                <span className="mx-1">•</span>
                <span>{formatTimeToNow(new Date(post.createdAt))}</span>
              </p>
            </div>

            {/* Title Part */}
            <a href={`/community/${subforumName}/post/${post.id}`}>
              <h1 className='text-2xl font-semibold pt-4 pb-2 leading-6 text-gray-900'>
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
                <DropdownMenuItem className='hover:cursor-pointer'>
                  <a href={`/community/${subforumName}/post/${post.id}`}>
                    More Info
                  </a>
                </DropdownMenuItem>
                {currentUserId === post.authorId && (
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

        <div className='flex justify-left gap-2'>
          {/* comments */}
          <div className='bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6'>
            <Link
              href={`/community/${subforumName}/post/${post.id}`}
              className='w-fit flex items-center gap-2'>
              <MessageSquare className='h-4 w-4' /> {commentAmt} comments
            </Link>
          </div>

          {/* Save post */}

          <Button
            variant={"secondary"}
            onClick={handleToggleSavePost}
            className='bg-gray-50 px-4 py-6 sm:px-4 rounded-none flex items-center gap-2'
            disabled={isPendingSavePost || isPendingDeletePost}
          >
            <Bookmark
              className='h-4 w-4 text-blue-500 '
              fill={isSaved ? 'blue' : 'none'} // Fill the icon if saved
            />
            {isSaved ? 'Saved' : 'Save'}
          </Button>

        </div>
      </div>
    </>
  )
}

export default Post
