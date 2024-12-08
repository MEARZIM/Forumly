'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { Dot, MessageSquare } from 'lucide-react'
import { formatTimeToNow } from '@/lib/utils'
import { Post as UserPost, User, Vote } from '@prisma/client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
}

const Post = ({
  post,
  votesAmount: _votesAmount,
  currentVote: _currentVote,
  subforumName,
  commentAmt,
}: PostProps) => {
  const postRef = useRef<HTMLParagraphElement>(null)

  return (
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
            <EditorOutput content={post.content}/>
            {postRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent' />
            ) : null}
          </div>
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
  )
}
export default Post