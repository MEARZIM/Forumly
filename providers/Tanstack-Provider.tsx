'use client'

import { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'


interface Props {
    children: ReactNode
}

const TanstackProvider = ({ children }: Props) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
    )
}

export default TanstackProvider;