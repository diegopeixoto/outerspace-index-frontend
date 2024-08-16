import { useEffect, useRef, useState } from 'react'
import TopBar from './TopBar'
import { ForumProps, TopBarProps, type TopicItemProps } from '@/types/layout'
import TopicItem from './TopicItem'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import useMeasure from 'react-use-measure'

const transition = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.75,
}

export default function Forum({ title, topicList }: ForumProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [isPinned, setIsPinned] = useState<boolean>(false)
  const [maxWidth, setMaxWidth] = useState(0)
  const [contentRef, { height: heightContent }] = useMeasure()
  const [topbarRef, { width: widthContainer }] = useMeasure()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsPinned(topicList.some((topic) => topic.isPinned))
  }, [topicList])

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return

    setMaxWidth(widthContainer)
  }, [widthContainer, maxWidth])

  const topbar: TopBarProps = {
    title: title,
    isPinned: isPinned,
    isOpen: isOpen,
    setIsOpen,
  }

  return (
    <MotionConfig transition={transition}>
      <div className="w-full flex-col" ref={ref}>
        <TopBar {...topbar} ref={topbarRef} />
        <div className="overflow-hidden">
          <AnimatePresence initial={false} mode="sync">
            {isOpen ? (
              <motion.div
                key={'topics'}
                initial={{ height: 0 }}
                animate={{ height: heightContent || 0 }}
                exit={{ height: 0 }}
                style={{
                  width: maxWidth,
                }}
              >
                <div
                  className={`bg-[#2D3037] shadow-[inset_0px_5px_15px_0px_rgba(0,0,0,0.08) 
                    flex h-fit py-1  flex-col items-start gap-4 self-stretch
                     `}
                  ref={contentRef}
                >
                  {topicList?.map((topicItem) => (
                    <TopicItem key={topicItem.id} {...topicItem} />
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  )
}
