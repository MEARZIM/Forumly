import Link from 'next/link'
import { getServerSession } from 'next-auth'

import SearchBar from './SearchBar'
import { authOptions } from '@/auth'
import { Icons } from '../icons/Icons'
import { UserAccountNav } from './UserAccountNav'
import { buttonVariants } from '@/components/ui/button'

const Navbar = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div className='fixed top-0 px-2 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2'>
            <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
                {/* logo */}
                <Link href='/' className='flex gap-2 items-center'>
                    <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
                    <p className='hidden text-zinc-700 text-sm font-medium md:block'>Breadit</p>
                </Link>

                {/* search bar */}
                <SearchBar />

                {/* actions */}
                {session?.user ? (
                    <UserAccountNav user={session.user} />
                ) : (
                    <div className='flex gap-2'>
                        <Link href='/signIn' className={buttonVariants({
                            variant: "outline",
                        })}>
                            Sign In
                        </Link>
                        <Link href='/signUp' className={buttonVariants({
                            variant: "outline",
                        })}>
                            Sign Up
                        </Link>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Navbar