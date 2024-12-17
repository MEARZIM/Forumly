"use client"

import React, { useState } from 'react'
import { Share } from 'lucide-react'

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
                    variant={"link"}
                    size={"icon"}
                    onClick={()=>setOpen(true)}
                >
                    <Share />
                </Button>
            
        </>

    )
}

