import type { handleLikeProps, TopicItemProps } from '@/types/layout'
export const getTopics = (browserId: string) => {
  return `api/topics?browser_id=${browserId}&pinned=${'false'}`
}

export const getPinned = (browserId: string) => {
  return `/api/topics?cursor=0&limit=50&pinned=${'true'}&browser_id=${browserId}`
}

export const fetcher = async (url: string) =>
  fetch(url).then((res) => res.json())

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
