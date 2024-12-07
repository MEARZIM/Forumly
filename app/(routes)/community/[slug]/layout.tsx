import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { notFound, usePathname } from 'next/navigation'

import { db } from '@/lib/db'
import { getAuthSession } from '@/auth'
import { buttonVariants } from '@/components/ui/button'
import { TextHighlighter } from "@/components/ui/Text-Highlight";
import SubscriberToggleButton from '@/components/layouts/SubscriberToggleButton'

const CommunityPageLayout = async ({
    children,
    params
}: {
    children: React.ReactNode
    params: {
        slug: string
    }
}) => {

    const { slug } = await params;
    const session = await getAuthSession()

    const subforum = await db.subforum.findFirst({
        where: {
            name: slug
        },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true
                }
            }
        }
    })

    if (!subforum) {
        return notFound();
    }

    const subscription = !session?.user
        ? undefined
        : await db.subscription.findFirst({
            where: {
                subforum: {
                    name: slug,
                },
                user: {
                    id: session.user.id,
                },
            },
        })
    const isSubscribed = !!subscription
    const totalMemberCount = await db.subscription.count({
        where: {
            subforum: {
                name: slug,
            },
        },
    })

    return (
        <section className=' h-full max-w-7xl mx-auto sm:container pt-10'>
            <div className=''>
                {/* Back to feed */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-4'>
                    <div className='flex flex-col col-span-2 space-y-6'>
                        {children}
                    </div>

                    <div className='overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last'>
                        <div className='px-6 py-4'>
                            <p className='font-semibold py-3 flex items-center'>
                                About r/
                                <TextHighlighter text={subforum.name} />
                            </p>
                        </div>
                        <div className='bg-white px-6 py-4 text-sm'>
                            <div className='flex justify-between gap-x-4 py-3'>
                                <div className='text-gray-500'>Created At</div>
                                <div className='text-gray-700'>
                                    <time dateTime={subforum.createdAt.toDateString()}>
                                        {format(subforum.createdAt, 'MMMM d, yyyy')}
                                    </time>
                                </div>
                            </div>
                            <div className='flex justify-between gap-x-4 py-3'>
                                <div className='text-gray-500'>Members</div>
                                <div className='flex items-start gap-x-2'>
                                    <div className='text-gray-900'>{totalMemberCount}</div>
                                </div>
                            </div>

                            {subforum.creatorId === session?.user?.id ? (
                                <div className='flex justify-between gap-x-4 py-3'>
                                    <dt className='text-gray-500'>You created this community</dt>
                                </div>
                            ) : null}

                            {subforum.creatorId !== session?.user?.id ? (
                                <SubscriberToggleButton  />
                            ) : null }

                            <Link
                                className={buttonVariants({
                                    variant: 'outline',
                                    className: 'w-full my-2',
                                })}
                                // if 'community/${slug}/submit' is created a problem it redirects back to it to http://localhost:3000/community/community/react/submit
                                href={`${slug}/submit`}
                            >
                                Create Post
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CommunityPageLayout
