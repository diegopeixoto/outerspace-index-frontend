import type { HandleLikeProps, TopicItemProps } from '@/types/layout'

interface GetTopicsOptions {
  pinned: boolean
  browserId: string
}

export const getTopicsUrl = ({
  pinned,
  browserId,
}: GetTopicsOptions): string => {
  if (!browserId) {
    throw new Error('Browser id is required')
  }
  const params = new URLSearchParams({
    browser_id: browserId,
    pinned: pinned.toString(),
  })
  return `api/topics?${params.toString()}`
}

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export const enhanceTopicsWithLikeHandler = (
  topicsData: TopicItemProps[],
  handleLike: HandleLikeProps
): TopicItemProps[] => {
  return topicsData
    .sort((a, b) => b.topicInfo.likes.count - a.topicInfo.likes.count)
    .map(
      (topic): TopicItemProps => ({
        ...topic,
        topicInfo: {
          ...topic.topicInfo,
          likes: {
            ...topic.topicInfo.likes,
            isPinned: topic.isPinned,
            handleLike,
          },
        },
      })
    )
}
