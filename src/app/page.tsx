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
import { type TopicAPIResponse } from '@/types/topic'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

export default function Home() {
  const browserId = useBrowserId()

  const { data, error, size, setSize, mutate } =
    useSWRInfinite<TopicAPIResponse>(
      (pageIndex, previousPageData) =>
        getTopics(pageIndex, previousPageData, false, browserId!),
      fetcher
    )
  const {
    data: pinnedData,
    error: pinnedError,
    mutate: pinedMutate,
  } = useSWR<TopicAPIResponse>(() => getPinned(true, browserId!), fetcher)

  const isLoadingInitialData = !data && !error && !pinnedData && !pinnedError

  const dataPinnedTopics = pinnedData ? pinnedData.topics : []
  const dataTopics = data ? data.flatMap((page) => page.topics) : []

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
      isPinned ? pinedMutate() : mutate()
    }
  }

  const topics = handleLikedData(dataTopics, handleLike)

  const pinnedTopics = handleLikedData(dataPinnedTopics, handleLike)

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
        {isLoadingInitialData ? (
          <p>Loading...</p>
        ) : (
          <>
            <Forum topicList={pinnedTopics} />
            <Forum topicList={topics} />
          </>
        )}
        <NavBar />
      </main>
    </>
  )
}
