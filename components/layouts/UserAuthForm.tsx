'use client'

import * as React from 'react'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Icons } from '../icons/Icons'


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm  = ({ 
  className, 
  ...props 
} : UserAuthFormProps) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button
        type='button'
        size='sm'
        className='w-full text-sm'
        onClick={loginWithGoogle}
        disabled={isLoading}>
        {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
        Google
      </Button>
    </div>
  )
}

export default UserAuthForm
