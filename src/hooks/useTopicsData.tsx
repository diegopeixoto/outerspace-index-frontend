import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { fetcher, getTopicsUrl } from '@/lib/handleData'
import { type TopicAPIResponse, type TopicType } from '@/types/topic'

export const useTopicsData = (browserId: string) => {
  const [topics, setTopics] = useState<TopicType>({ regular: [], pinned: [] })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { data: regularData, isLoading: isLoadingRegular } =
    useSWR<TopicAPIResponse>(
      () => getTopicsUrl({ pinned: false, browserId }),
      fetcher
    )

  const { data: pinnedData, isLoading: isLoadingPinned } =
    useSWR<TopicAPIResponse>(
      () => getTopicsUrl({ pinned: true, browserId }),
      fetcher
    )

  useEffect(() => {
    setIsLoading(isLoadingRegular || isLoadingPinned)
  }, [isLoadingPinned, isLoadingRegular])

  useEffect(() => {
    if (regularData && pinnedData) {
      setTopics({
        regular: regularData.topics,
        pinned: pinnedData.topics,
      })
    }
  }, [regularData, pinnedData])

  return { topics, isLoading, setTopics }
}
