'use client'

import Category from '@/components/Category'
import Forum from '@/components/Forum'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { useBrowserId } from '@/lib/browserid'
import {
  fetcher,
  getPinned,
  getTopics,
  handleLikedData,
} from '@/lib/handleData'
import { type TopicAPIResponse, type TopicType } from '@/types/topic'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import ForumSkeleton from '@/components/Skeleton/ForumSkeleton'

export default function Home() {
  const browserId = useBrowserId()
  const [topics, setTopics] = useState<TopicType>({ regular: [], pinned: [] })

  const {
    data: regularData,
    size,
    setSize,
    mutate: regularMutate,
    isLoading: isLoadingRegular,
  } = useSWRInfinite<TopicAPIResponse>(
    (pageIndex, previousPageData) => getTopics(pageIndex + 1, 10, browserId!),
    fetcher
  )
  const {
    data: pinnedData,
    mutate: pinedMutate,
    isLoading: isLoadingPinned,
  } = useSWR<TopicAPIResponse>(() => getPinned(browserId!), fetcher)

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
        ...topics,
        regular: handleLikedData(
          regularData.flatMap((page) => page.topics),
          handleLike
        ),
        pinned: handleLikedData(pinnedData.topics, handleLike),
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
