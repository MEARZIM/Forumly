import React from 'react'
import Link from 'next/link'

import { buttonVariants } from '../ui/button'
import { HomeIcon } from 'lucide-react'

const CreateCommunity = () => {
    return (
        <div>
            <div className='bg-emerald-100 px-6 py-4'>
                <div className='font-semibold py-3 gap-1.5'>
                    <div className="flex items-center gap-2">
                        <HomeIcon className='h-5 w-4' />
                        <span className="pt-1">
                            Home
                        </span>
                    </div>
                </div>
            </div>
            <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
                <div className='flex justify-between gap-x-4 py-3'>
                    <p className='text-zinc-500'>
                        Your personal Forumly frontpage. Come here to check in with your
                        favorite communities.
                    </p>
                </div>

                <Link
                    className={buttonVariants({
                        className: 'w-full mt-4 mb-6',
                    })}
                    href={`/community/create`}>
                    Create Community
                </Link>
            </dl>
        </div>
    )
}

export default CreateCommunity
