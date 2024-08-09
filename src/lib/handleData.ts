import type { handleLikeProps, TopicItemProps } from '@/types/layout'

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const getTopics = (
  pageIndex: number,
  previousPageData: TopicItemProps[],
  isPinned: boolean,
  browserId: string
) => {
  if (previousPageData && !previousPageData.length) return null
  return `/api/topics?page=${pageIndex}&pinned=${isPinned}&browser_id=${browserId}`
}

export const getPinned = (isPinned: boolean, browserId: string) => {
  return `/api/topics?page=1&pinned=${isPinned}&browser_id=${browserId}`
}

export const handleLikedData = (
  topicsData: TopicItemProps[],
  handleLike: handleLikeProps
) => {
  return topicsData.map((topic) => {
    return {
      ...topic,
      topicInfo: {
        ...topic.topicInfo,
        likes: {
          ...topic.topicInfo.likes,
          topicId: topic.id,
          isPinned: topic.isPinned,
          handleLike: handleLike,
        },
      },
    }
  })
}
