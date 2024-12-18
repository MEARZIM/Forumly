'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { LanguageSelector } from './LanguageSelector'
import { Skeleton } from '@/components/ui/skeleton'
import EditorOutput from '@/components/layouts/EditorOutput'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface Props {
    content: any
}

const ContentDisplay = ({ content }: Props) => {
    const [language, setLanguage] = React.useState('en')
    const [translatedContent, setTranslatedContent] = useState(content)

    const { mutate: translateContent, isPending } = useMutation({
        mutationFn: async (language: string) => {
            const { data } = await axios.post('/api/translate', {
                language,
                content,
            })
            return data
        },
        onSuccess: (data) => {
            setTranslatedContent(data)
        },
        onError: (error) => {
            console.error('Translation failed:', error)
        },
    })

    // Handle language change by triggering the mutation
    const handleLanguageChange = (language: string) => {
        setLanguage(language)
        translateContent(language)
    }

    return (
        <div>
            <div className="flex justify-start p-2">
                <LanguageSelector onLanguageChange={handleLanguageChange} />
            </div>
            <Suspense fallback={<Skeleton />}>
                {isPending ? (
                    <Skeleton className="h-40 w-full rounded-md" />
                ) : (
                    language === 'en' ? (
                        <EditorOutput content={content} />
                    ) : (
                        <div>{translatedContent}</div>
                    )
                )}

            </Suspense>
        </div>
    )
}

export default ContentDisplay
