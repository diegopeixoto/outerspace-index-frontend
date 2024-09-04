import { useState, useEffect } from 'react'
import { useQueries, useQueryClient } from '@tanstack/react-query'
import { fetcher, getTopicsUrl } from '@/lib/handleData'
import { type TopicAPIResponse, type TopicType } from '@/types/topic'

export const useTopicsData = (browserId: string) => {
  const [topics, setTopics] = useState<TopicType>({ regular: [], pinned: [] })

  const queries = useQueries({
    queries: [
      {
        queryKey: ['topics', 'regular', browserId],
        queryFn: () =>
          fetcher<TopicAPIResponse>(getTopicsUrl({ pinned: false, browserId })),
        staleTime: 60000,
        gcTime: 3600000,
      },
      {
        queryKey: ['topics', 'pinned', browserId],
        queryFn: () =>
          fetcher<TopicAPIResponse>(getTopicsUrl({ pinned: true, browserId })),
        staleTime: 60000,
        gcTime: 3600000,
      },
    ],
  })

  const [regularQuery, pinnedQuery] = queries

  useEffect(() => {
    if (regularQuery.data && pinnedQuery.data) {
      setTopics({
        regular: regularQuery.data.topics.sort(
          (a, b) => b.topicInfo.likes.count - a.topicInfo.likes.count
        ),
        pinned: pinnedQuery.data.topics.sort(
          (a, b) => b.topicInfo.likes.count - a.topicInfo.likes.count
        ),
      })
    }
  }, [regularQuery.data, pinnedQuery.data])

  const isLoading = regularQuery.isLoading || pinnedQuery.isLoading

  return { topics, isLoading, setTopics }
}
