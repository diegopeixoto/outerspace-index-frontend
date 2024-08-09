import { useState } from 'react'
import TopBar from './TopBar'
import { ForumProps, TopBarProps } from '@/types/layout'
import TopicItem from './TopicItem'

export default function Forum({ title, topicList }: ForumProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const topbar: TopBarProps = {
    title: title,
    isPinned: topicList.some((topic) => topic.isPinned),
    isVisible: isVisible,
    setIsVisible,
  }
  return (
    <div className="w-full flex-col">
      <TopBar {...topbar} />
      <div
        className={`bg-[#2D3037] shadow-[inset_0px_5px_15px_0px_rgba(0,0,0,0.08) 
                    flex h-fit py-1  flex-col items-start gap-4 self-stretch
                    ${isVisible ? 'flex' : 'hidden'} 
                     `}
      >
        {topicList?.map((topicItem) => (
          <TopicItem key={topicItem.id} {...topicItem} />
        ))}
      </div>
    </div>
  )
}
