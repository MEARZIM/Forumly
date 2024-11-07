'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from './button'


const CloseModalButton = () => {
  const router = useRouter()

  return (
    <Button
      variant='outline'
      size={"icon"}
      className='h-6 w-6 p-0 rounded-md'
      onClick={() => router.back()}
    >
      <X aria-label='close modal' className='h-4 w-4' />
    </Button>
  )
}

export default CloseModalButton