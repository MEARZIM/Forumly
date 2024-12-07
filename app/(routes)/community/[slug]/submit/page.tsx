import Heading from '@/components/ui/heading';
import React from 'react'

interface Props {
    params: {
        slug: string
    }
}
const PostSubmitPage = async ({
    params
}: Props) => {
    const { slug } = await params;
    return (
        <div className='flex flex-col items-start gap-6'>
            <Heading
                title='Create Post'
                description={`in r/${slug}`}
            />
        </div>
    )
}

export default PostSubmitPage
