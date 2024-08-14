'use client'

import Category from '@/components/Category'
import Forum from '@/components/Forum'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { useBrowserId } from '@/lib/browserid'
import {
  enhanceTopicsWithLikeHandler,
  fetcher,
  getTopicsUrl,
} from '@/lib/handleData'
import { type TopicAPIResponse, type TopicType } from '@/types/topic'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import ForumSkeleton from '@/components/Skeleton/ForumSkeleton'

export default function Home() {
  const browserId = useBrowserId()
  const [topics, setTopics] = useState<TopicType>({ regular: [], pinned: [] })

  const {
    data: regularData,
    mutate: regularMutate,
    isLoading: isLoadingRegular,
  } = useSWR<TopicAPIResponse>(
    () => getTopicsUrl({ pinned: false, browserId: browserId! }),
    fetcher
  )

  const {
    data: pinnedData,
    mutate: pinedMutate,
    isLoading: isLoadingPinned,
  } = useSWR<TopicAPIResponse>(
    () => getTopicsUrl({ pinned: true, browserId: browserId! }),
    fetcher
  )

  useEffect(() => {
    const handleLike = async (
      topicId: string,
      isPinned: boolean,
      action: string
    ) => {
      if (!browserId) return
      const response = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic_id: topicId,
          browser_id: browserId,
          action,
        }),
      })

      if (response.ok) {
        isPinned ? pinedMutate() : regularMutate()
      }
    }

    if (regularData && pinnedData) {
      setTopics({
        regular: enhanceTopicsWithLikeHandler(regularData.topics, handleLike),
        pinned: enhanceTopicsWithLikeHandler(pinnedData.topics, handleLike),
      })
    }
  }, [regularData, pinnedData, browserId, pinedMutate, regularMutate])

  return (
    <>
      <Header />
      <main className="max-w-[800px] bg-[#1b1c21]">
        <div className="flex flex-col justify-center p-4 w-full">
          <Category
            title="PC, Hardware & Gadgets - Discussão"
            description="Espaço para tudo sobre PCs e gadgets. Overclock, placas de vídeo, processadores e objetos de tecnologia em geral."
          />
        </div>
        {isLoadingPinned && isLoadingRegular ? (
          <>
            <ForumSkeleton quantity={1} />
            <ForumSkeleton quantity={8} />
          </>
        ) : (
          <>
            <Forum topicList={topics.pinned} />
            <Forum topicList={topics.regular} />
            <div className="mt-14"></div>
          </>
        )}

        <NavBar />
      </main>
    </>
  )
}
