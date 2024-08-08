import { useState } from 'react'
import TopBar from './TopBar'
import { ForumProps } from '@/types/layout'
import TopicItem from './TopicItem'
function getRandom() {
  return Math.floor(Math.random() * 1000)
}

export default function Forum({ topbar }: ForumProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  return (
    <div className="w-full flex-col">
      <TopBar
        title={topbar.title}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <div
        className={`bg-[#2D3037] shadow-[inset_0px_5px_15px_0px_rgba(0,0,0,0.08) 
                    flex h-fit py-5  flex-col items-start gap-4 self-stretch
                    ${isVisible ? 'flex' : 'hidden'} 
                     `}
      >
        <TopicItem avatar={{ src: 'https://i.pravatar.cc/' + getRandom() }} />
        <TopicItem avatar={{ src: 'https://i.pravatar.cc/' + getRandom() }} />
      </div>
    </div>
  )
}
