'use client'

import { FC } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const Output = dynamic(
    async () => (await import('editorjs-react-renderer')).default,
    { ssr: false }
)

interface EditorOutputProps {
    content: any
}

function CustomCodeRenderer({ data }: any) {
    // For rendering the Code Part
    return (
        <pre className='bg-gray-800 rounded-md p-4'>
            <code className='text-gray-100 text-sm'>{data.code}</code>
        </pre>
    )
}
function CustomImageRenderer({ data }: any) {
    // For rendering the Images
    const src = data.file.url

    return (
        <div className='relative w-full min-h-[15rem]'>
            <Image alt='image' className='object-contain' fill src={src} />
        </div>
    )
}


const renderers = {
    image: CustomImageRenderer,
    code: CustomCodeRenderer,
}

const style = {
    paragraph: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
    },
}

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
    return (
        <Output
            style={style}
            className='text-sm'
            renderers={renderers}
            data={content}
        />
    )
}

export default EditorOutput