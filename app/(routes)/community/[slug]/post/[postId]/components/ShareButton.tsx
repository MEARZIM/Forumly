"use client"

import React, { useState } from 'react'
import { Share2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import ShareModal from '@/components/modals/share-modal'




export const ShareButton = () => {
    const [open, setOpen] = useState(false);

    return (

        <>
            <ShareModal
                isOpen={open}
                onClose={() => setOpen(false)}
            />

            <Button
                variant={"outline"}
                // size={"icon"}
                // className='w-6 h-6'
                onClick={() => setOpen(true)}
            >
                <Share2 size={32} />
            </Button>

        </>

    )
}

