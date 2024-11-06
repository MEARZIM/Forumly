import Link from 'next/link'
import { BrainCog } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import SearchBar from './SearchBar'
import UserAccountNav from './UserAccountNav'

const Navbar = async () => {
    return (
        <div className='fixed top-0 px-2 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2'>
            <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
                {/* logo */}
                <Link href='/' className='flex gap-2 items-center'>
                    <BrainCog className='h-8 w-8 sm:h-6 sm:w-6' />
                    <p className='hidden text-zinc-700 text-sm font-medium md:block'>Breadit</p>
                </Link>

                {/* search bar */}
                <SearchBar />

                {/* actions */}
                <Link
                    href="/sign-in"
                    className={buttonVariants({
                        variant: "outline",
                    })}
                >
                    Sign In
                </Link>

            </div>
        </div>
    )
}

export default Navbar