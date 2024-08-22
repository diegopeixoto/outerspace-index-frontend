import type { TopicType } from '@/types/topic'

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
  return `api/data?${params.toString()}`
}

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}
export const updateTopicLike = (
  prevTopics: TopicType,
  topicId: string,
  isPinned: boolean,
  action: string
) => {
  const category = isPinned ? 'pinned' : 'regular'
  return prevTopics[category].map((topic) => {
    if (topic.id === topicId) {
      return {
        ...topic,
        topicInfo: {
          ...topic.topicInfo,
          likes: {
            ...topic.topicInfo.likes,
            count:
              action === 'like'
                ? topic.topicInfo.likes.count + 1
                : topic.topicInfo.likes.count - 1,
            liked: action === 'like',
          },
        },
      }
    }
    return topic
  })
}
