import type { handleLikeProps, TopicItemProps } from '@/types/layout'

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const getTopics = (
  pageIndex: number,
  pageSize: number,
  previousPageData: TopicItemProps[],
  isPinned: boolean,
  browserId: string
) => {
  if (previousPageData && !previousPageData.length) return null
  return `/api/topics?_page=${pageIndex}&_page_size=${pageSize}&pinned=${isPinned}&browser_id=${browserId}`
}

export const getPinned = (isPinned: boolean, browserId: string) => {
  return `/api/topics?_page=1&_page_size=50&pinned=${isPinned}&browser_id=${browserId}`
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
