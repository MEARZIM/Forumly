import Link from 'next/link'

import { toast } from '@/hooks/use-toast'
import { buttonVariants } from '@/components/ui/button'

export const useLoginToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Login required.',
      description: 'You need to be logged in to do that.',
      variant: 'destructive',
      action: (
        <Link
          onClick={() => dismiss()}
          href='/signIn'
          className={buttonVariants({ variant: 'loginToastButton' })}>
          Login
        </Link>
      ),
    })
  }

  return { loginToast }
}
