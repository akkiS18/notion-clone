'use client'

import { Cover } from '@/components/shared/cover'
import { Toolbar } from '@/components/shared/toolbar'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'

interface DocumentIdPageProps {
    params: {documentId: Id<'documents'>}
}

const Page = ({params}: DocumentIdPageProps) => {
    const document = useQuery(api.document.getDocumentById, {
        id: params.documentId as Id<'documents'>,
    })
    const updateFields = useMutation(api.document.updateFields)

  const Editor = useMemo(() => dynamic(() => import('@/components/shared/editor'), {ssr: false}),
    []
  )

  if(document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className='md:max-w-3xl lg:max-w-4xl mx-auto mt-10'>
          <div className='space-y-4 pl-8 pt-4'>
            <Skeleton className='h-14 w-[50%]' />
            <Skeleton className='h-4 w-[80%]' />
            <Skeleton className='h-4 w-[60%]' />
            <Skeleton className='h-4 w-40%' />
          </div>
        </div>
      </div>
    )
  }

  if(document === null) return null

  return (
    <div >
      <Cover url={
        document.coverImage
      } preview />  

      <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar document={document} preview />
        <Editor initialContent={document.content} onChange={() => {}} editable={false} />
      </div>
    </div>
  )
}

export default Page