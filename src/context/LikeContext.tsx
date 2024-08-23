import React, { createContext, useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
}> = ({ children, browserId, setTopics }) => {
  const queryClient = useQueryClient()

  const likeMutation = useMutation({
    mutationFn: async ({
      topicId,
      isPinned,
      action,
    }: {
      topicId: string
      isPinned: boolean
      action: string
    }) => {
      const response = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic_id: topicId,
          browser_id: browserId,
          is_pinned: isPinned,
          action,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to update like on the server')
      }
      return response.json()
    },
    onMutate: async ({ topicId, isPinned, action }) => {
      await queryClient.cancelQueries({ queryKey: ['topics'] })
      const previousTopics = queryClient.getQueryData(['topics'])

      setTopics((prevTopics) => ({
        ...prevTopics,
        [isPinned ? 'pinned' : 'regular']: updateTopicLike(
          prevTopics,
          topicId,
          isPinned,
          action
        ),
      }))

      return { previousTopics }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTopics) {
        queryClient.setQueryData(['topics'], context.previousTopics)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] })
    },
  })

  const handleLike = (topicId: string, isPinned: boolean, action: string) => {
    likeMutation.mutate({ topicId, isPinned, action })
  }

  return (
    <LikeContext.Provider value={{ handleLike }}>
      {children}
    </LikeContext.Provider>
  )
}
