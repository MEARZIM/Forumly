"use client"
import Link from 'next/link'

import { Icons } from '../icons/Icons'
import UserAuthForm from '@/components/layouts/UserAuthForm'

export const SignUp = () => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
      <div className='flex flex-col items-center space-y-2 text-center'>
        <Icons.logo className='mx-auto h-10 w-10' />
        <h1 className='text-2xl font-semibold tracking-tight'>Welcome Boss</h1>
        <h1 className='text-lg font-semibold tracking-tight'>Sign Up Here</h1>
        <p className='text-sm max-w-xs mx-auto'>
          By continuing, you are setting up a Formuly account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthForm />
      <p className='px-8 text-center text-sm text-muted-foreground'>
        Already a Forumly member?{' '}
        <Link
          href='/signIn'
          className='text-blue-600 hover:text-brand text-sm underline underline-offset-4'>
          Sign In
        </Link>
      </p>
    </div>
  )
}

