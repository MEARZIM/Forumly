'use client'

import { 
    useEffect, 
    useState 
} from 'react';
import type { Session } from 'next-auth';
import { usePathname, useRouter } from 'next/navigation';
import { Image as ImageIcon, Link2 } from 'lucide-react';

import { UserAvatar } from './UserAvatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface MiniCreatePostProps {
    session: Session | null;
}

export const MiniCreatePost = ({
    session
}: MiniCreatePostProps) => {

    const router = useRouter()
    const pathname = usePathname()
    const [mounted, setIsMounted]= useState<boolean>(false);

    useEffect(() =>{
        setIsMounted(true);
    },[])

    if(!mounted) {
        return null; 
    }

    return (
        <>
            <div className='overflow-hidden rounded-3xl bg-white shadow mx-3'>
                <div className='h-full px-6 py-4 flex justify-between items-center gap-6'>
                    <div className='relative'>
                        <UserAvatar
                            user={{
                                name: session?.user.name || null,
                                image: session?.user.image || null,
                            }}
                            className='h-8 w-8 md:h-10 md:w-10'
                        />
                        <span className='absolute bottom-0 md:bottom-1 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white' />
                    </div>
                    <Input
                        onClick={() => router.push(pathname + '/submit')}
                        readOnly
                        placeholder='Create post'
                        className='h-8 md:h-10 text-sm'
                    />
                    <Button
                        onClick={() => router.push(pathname + '/submit')}
                        variant='ghost'>
                        <ImageIcon className='text-zinc-600' />
                    </Button>
                    <Button
                        onClick={() => router.push(pathname + '/submit')}
                        variant='ghost'>
                        <Link2 className='text-zinc-600' />
                    </Button>
                </div>
            </div>
        </>
    )
}

