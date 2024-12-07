import React from 'react'
import { notFound } from 'next/navigation';

import Heading from '@/components/ui/heading';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import Editor from '@/components/layouts/Editor';

interface Props {
    params: {
        slug: string
    }
}
const PostSubmitPage = async ({
    params
}: Props) => {
    const { slug } = await params;

    const subforum = await db.subforum.findFirst({
        where: {
            name: slug,
        }
    })

    if (!subforum) {
        return notFound();
    }

    return (
        <div className='flex flex-col items-start gap-6'>
            <Heading
                title='Create Post'
                description={`in r/${slug}`}
            />

            <Editor subforumId={subforum.id} />

            <div className='w-full flex justify-end'>
                <Button
                    type='submit'
                    className='w-full'
                    form='subforum-form-post'
                >
                    Post
                </Button>
            </div>
        </div>
    )
}

export default PostSubmitPage
