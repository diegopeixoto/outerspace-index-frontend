'use client'

import Category from '@/components/Category'
import Forum from '@/components/Forum'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { TopicItemProps } from '@/types/layout'
import { type TopicAPIResponse } from '@/types/topic'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const getKey = (
  pageIndex: number,
  previousPageData: TopicItemProps[],
  isPinned: boolean,
  browserId: string
) => {
  if (previousPageData && !previousPageData.length) return null
  return `/api/topics?page=${pageIndex}&pinned=${isPinned}&browser_id=${browserId}`
}

const getPinned = (isPinned: boolean, browserId: string) => {
  return `/api/topics?page=1&pinned=${isPinned}&browser_id=${browserId}`
}

function useBrowserId() {
  const [browserId, setBrowserId] = useState<string | null>(null)

  useEffect(() => {
    let id = localStorage.getItem('browserId')
    if (!id) {
      id = Math.random().toString(36).substring(2, 15)
      localStorage.setItem('browserId', id)
    }
    setBrowserId(id)
  }, [])

  return browserId
}

export default function Home() {
  const browserId = useBrowserId()
  const { data, error, size, setSize, mutate } =
    useSWRInfinite<TopicAPIResponse>(
      (pageIndex, previousPageData) =>
        getKey(pageIndex, previousPageData, false, browserId!),
      fetcher
    )
  const { data: pinnedData, error: pinnedError } = useSWR<TopicAPIResponse>(
    () => getPinned(true, browserId!),
    fetcher
  )
  console.log(pinnedData)
  const isLoadingInitialData = !data && !error && !pinnedData && !pinnedError

  const pinnedTopics = pinnedData ? pinnedData.topics : []
  console.log(pinnedTopics)
  const topics = data ? data.flatMap((page) => page.topics) : []

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
