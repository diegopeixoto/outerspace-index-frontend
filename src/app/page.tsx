'use client'

import Category from '@/components/Category'
import Forum from '@/components/Forum'
import Header from '@/components/Header'
import { useBrowserId } from '@/lib/browserid'
import {
  enhanceTopicsWithLikeHandler,
  fetcher,
  getTopicsUrl,
} from '@/lib/handleData'
import { type TopicAPIResponse, type TopicType } from '@/types/topic'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import ForumSkeleton from '@/components/Skeleton/ForumSkeleton'
import { AnimatePresence, motion } from 'framer-motion'
import type { TopicItemProps } from '@/types/layout'

export default function Home() {
  const browserId = useBrowserId()
  const [topics, setTopics] = useState<TopicType>({ regular: [], pinned: [] })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const {
    data: regularData,
    mutate: regularMutate,
    isLoading: isLoadingRegular,
  } = useSWR<TopicAPIResponse>(
    () => getTopicsUrl({ pinned: false, browserId: browserId! }),
    fetcher
  )

  const {
    data: pinnedData,
    mutate: pinedMutate,
    isLoading: isLoadingPinned,
  } = useSWR<TopicAPIResponse>(
    () => getTopicsUrl({ pinned: true, browserId: browserId! }),
    fetcher
  )
  useEffect(() => {
    if (!isLoadingRegular && !isLoadingPinned) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [isLoadingPinned, isLoadingRegular])

  useEffect(() => {
    const updateTopicLike = (
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

    const handleLike = async (
      topicId: string,
      isPinned: boolean,
      action: string
    ) => {
      if (!browserId) return

      setTopics((prevTopics) => {
        return {
          ...prevTopics,
          [isPinned ? 'pinned' : 'regular']: updateTopicLike(
            prevTopics,
            topicId,
            isPinned,
            action
          ),
        }
      })

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
          isPinned ? pinedMutate() : regularMutate()
        } else {
          setTopics((prevTopics) => {
            return {
              ...prevTopics,
              [isPinned ? 'pinned' : 'regular']: updateTopicLike(
                prevTopics,
                topicId,
                isPinned,
                action === 'like' ? 'unlike' : 'like'
              ),
            }
          })
          console.error('Failed to update like on the server')
        }
      } catch (error) {
        console.error('Error communicating with the server:', error)
      }
    }

    if (regularData && pinnedData) {
      setTopics({
        regular: enhanceTopicsWithLikeHandler(regularData.topics, handleLike),
        pinned: enhanceTopicsWithLikeHandler(pinnedData.topics, handleLike),
      })
    }
  }, [regularData, pinnedData, browserId, pinedMutate, regularMutate])

  return (
    <>
      <Header />
      <main className="max-w-[800px] bg-[#1b1c21]">
        <div className="flex flex-col justify-center p-4 w-full">
          <Category
            title="PC, Hardware & Gadgets - Discussão"
            description="Espaço para tudo sobre PCs e gadgets. Overclock, placas de vídeo, processadores e objetos de tecnologia em geral."
          />
        </div>
        <AnimatePresence mode="sync">
          <motion.div
            key={`${isLoading}-${topics.pinned.length}-${topics.regular.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
          >
            {isLoading ? (
              <>
                <ForumSkeleton quantity={1} />
                <ForumSkeleton quantity={8} />
              </>
            ) : (
              <>
                <Forum topicList={topics.pinned} />
                <Forum topicList={topics.regular} />
                <div className="mt-14"></div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  )
}
