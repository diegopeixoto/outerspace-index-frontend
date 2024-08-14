import type { HandleLikeProps, TopicItemProps } from '@/types/layout'

interface GetTopicsOptions {
  pinned: boolean
  browserId: string
}

export const getTopicsUrl = ({
  pinned,
  browserId,
}: GetTopicsOptions): string => {
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
  return topicsData.map(
    (topic): TopicItemProps => ({
      ...topic,
      topicInfo: {
        ...topic.topicInfo,
        likes: {
          ...topic.topicInfo.likes,
          topicId: topic.id,
          isPinned: topic.isPinned,
          handleLike,
        },
      },
    })
  )
}
