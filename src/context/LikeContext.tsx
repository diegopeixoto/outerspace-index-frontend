import React, { createContext, useContext, useState } from 'react'
import { useSWRConfig } from 'swr'
import { updateTopicLike } from '@/lib/handleData'
import { type TopicType } from '@/types/topic'

interface LikeContextProps {
  handleLike: (topicId: string, isPinned: boolean, action: string) => void
}

const LikeContext = createContext<LikeContextProps | null>(null)

export const useLikeContext = () => {
  const context = useContext(LikeContext)
  if (!context) {
    throw new Error('useLikeContext must be used within a LikeProvider')
  }
  return context
}

export const LikeProvider: React.FC<{
  children: React.ReactNode
  browserId: string
  setTopics: React.Dispatch<React.SetStateAction<TopicType>>
  topics: TopicType
}> = ({ children, browserId, setTopics, topics }) => {
  const { mutate: pinedMutate } = useSWRConfig()
  const { mutate: regularMutate } = useSWRConfig()

  const handleLike = async (
    topicId: string,
    isPinned: boolean,
    action: string
  ) => {
    if (!browserId) return

    setTopics((prevTopics) => ({
      ...prevTopics,
      [isPinned ? 'pinned' : 'regular']: updateTopicLike(
        prevTopics,
        topicId,
        isPinned,
        action
      ),
    }))

    try {
      const response = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic_id: topicId,
          browser_id: browserId,
          action,
        }),
      })

      if (response.ok) {
        isPinned ? pinedMutate(response) : regularMutate(response)
      } else {
        setTopics((prevTopics) => ({
          ...prevTopics,
          [isPinned ? 'pinned' : 'regular']: updateTopicLike(
            prevTopics,
            topicId,
            isPinned,
            action === 'like' ? 'unlike' : 'like'
          ),
        }))
        console.error('Failed to update like on the server')
      }
    } catch (error) {
      console.error('Error communicating with the server:', error)
    }
  }

  return (
    <LikeContext.Provider value={{ handleLike }}>
      {children}
    </LikeContext.Provider>
  )
}
