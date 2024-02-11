'use client'

import { ChildProps } from '@/types'
import React from 'react'
import { useConvexAuth } from 'convex/react'
import Loader from '@/components/ui/loader'
import { redirect } from 'next/navigation'
import { Sidebar } from './components/sidebar'
import { SearchCommand } from '@/components/shared/search-command'

const SecretLayout = ({children}: ChildProps) => {
    const { isAuthenticated, isLoading } = useConvexAuth()

    if(isLoading) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <Loader size={'lg'} />
            </div>
        )
    }

    if(!isAuthenticated) {
        return redirect('/')
    }

  return (
    <div className='flex w-full'>
        <Sidebar />
        <main className='flex-1 h-full overflow-y-auto'>
            <SearchCommand />
            {children}
        </main>
    </div>
  )
}

export default SecretLayout