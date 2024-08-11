import type { handleLikeProps, TopicItemProps } from '@/types/layout'

export const fetcher = async (url: string) =>
  fetch(url).then((res) => res.json())
export const getTopics = (
  pageIndex: number,
  pageSize: number,
  browserId: string
) => {
  return `/api/topics?_page=${pageIndex}&_page_size=${pageSize}&pinned=${'false'}&browser_id=${browserId}`
}

export const getPinned = (browserId: string): string => {
  return `/api/topics?_page=1&_page_size=50&pinned=${'true'}&browser_id=${browserId}`
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
