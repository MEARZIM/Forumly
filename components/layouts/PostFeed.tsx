"use client"

import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';

import { ExtendedPost } from '@/types/post'
import { INFINITE_SCROLL_PAGINATION_NUMBER } from '@/config';

import Post from './Post';


interface PostFeedProps {
    initialPosts: ExtendedPost[]
    subforumName?: string
}

const PostFeed = ({
    initialPosts,
    subforumName
}: PostFeedProps) => {

    const { data: session } = useSession();

    const containerRef = useRef<HTMLElement>(null);
    const { ref, entry } = useIntersection({
        root: containerRef.current,
        threshold: 1,
    });

    const {
        data,
        isFetchingNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: async ({ pageParam }) => {
            const query = `/api/post?limit=${INFINITE_SCROLL_PAGINATION_NUMBER}&page=${pageParam}` + (!!subforumName ? `&subforumName=${subforumName}` : "");
            const res = await axios.get(query);
            return res.data as ExtendedPost[];
        },
        initialPageParam: 1,
        getNextPageParam: (_, Page) => {
            return Page.length + 1;
        },
        initialData: {
            pages: [initialPosts],
            pageParams: [1]
        }
    })

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage();
        }
    }, [entry, fetchNextPage])

    const posts = data.pages.flatMap((page) => page) ?? initialPosts;

    return (
        <ul className='flex flex-col col-span-2 space-y-6'>
            {posts.map((post, index) => {
                // Calculate the total votes for the post
                const votesAmount = post.votes.reduce((accumulator, vote) => {
                    if (vote.type === 'UP') return accumulator + 1;
                    if (vote.type === 'DOWN') return accumulator - 1;
                    return accumulator;
                }, 0);

                // Find the current vote of the logged-in user
                const currentVote = post.votes.find(
                    (vote) => vote.userId === session?.user.id
                );
                // Check if the current post is saved by the logged-in user
                const savedPost = (post.SavedPost).find(
                    (savedPost) => savedPost.userId === session?.user.id
                );

                const isSaved = savedPost !== undefined;


                // Return the last post with the ref for intersection observer
                if (index === posts.length - 1) {
                    return (
                        <li key={post.id} ref={ref}>
                            <Post
                                post={post}
                                commentAmt={post.comments.length}
                                subforumName={post.subForum.name}
                                votesAmount={votesAmount}
                                currentVote={currentVote}
                                currentUserId={session?.user?.id}
                                initialSavedState={isSaved} // Pass the saved status to the Post component
                            />
                        </li>
                    );
                } else {
                    // Return other posts normally
                    return (
                        <Post
                            key={post.id}
                            post={post}
                            commentAmt={post.comments.length}
                            subforumName={post.subForum.name}
                            votesAmount={votesAmount}
                            currentVote={currentVote}
                            currentUserId={session?.user?.id}
                            initialSavedState={isSaved} // Pass the saved status to the Post component
                        />
                    );
                }
            })}

            {/* Show loading spinner if fetching next page */}
            {isFetchingNextPage && (
                <li className='flex justify-center'>
                    <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
                </li>
            )}
        </ul>

    )
}

export default PostFeed

