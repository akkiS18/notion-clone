'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import { SignInButton } from '@clerk/clerk-react'
import Loader from '@/components/ui/loader'

export const Heroes = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <>
      <div className='max-w-3xl space-y-4'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
            Write, plan, share. With AI at your side.
        </h1>
        <h3 className='text-base sm:text:xl md:text-2xl font-medium'>
            Notion is the connected workspace where better, faster work happens.
        </h3>
        {isLoading && (
          <div className='w-full flex justify-center items-center'>
            <Loader />
          </div>
        )}

        {isAuthenticated && !isLoading && (
            <Button asChild>
              <Link href={'/documents'}>
                Enter notion <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button> 
          )}
          {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode='modal'>
              <Button>
                  Get Notion Free <ArrowRight className='w-4 h-4 ml-2' />
              </Button> 
            </SignInButton>
          </>     
          )}
      </div>

      <div className='flex flex-col items-center justify-center max-w-5xl'>
        <div className='flex items-center'>
            <div className="relative h-[400px] w-[400px] hidden md:block">
                <Image src={'/men.svg'} alt='Logo' fill className='object-cover dark:hidden' />
                <Image src={'/men-dark.svg'} alt='Logo' fill className='object-cover hidden dark:block' />
            </div>
        </div>
      </div>
    </>
  )
}