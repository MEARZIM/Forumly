import React from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { SignIn as SignInComponent } from '@/components/layouts/SignIn';

const SignInPage = () => {
  return (
    <section>
      <div className='absolute inset-0'>
        <div className='h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20'>
          <div className='bg-slate-300 px-8 py-20 rounded-xl'>

            <Link
              href='/'
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'self-start border'
              )}>
              <ChevronLeft className='h-4 w-4' />
              Home
            </Link>

            <SignInComponent />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignInPage
