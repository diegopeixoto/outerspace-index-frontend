import { useState } from 'react'
import TopBar from './TopBar'
import { ForumProps } from '@/types/layout'
import TopicItem from './TopicItem'

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
                    flex h-fit py-1  flex-col items-start gap-4 self-stretch
                    ${isVisible ? 'flex' : 'hidden'} 
                     `}
      >
        <TopicItem
          id="x"
          avatar={{ src: 'https://i.pravatar.cc/30' }}
          topicInfo={{
            topic: { title: 'teste teste teste 111', url: '#' },
            author: { name: 'autor01', authorUrl: '#' },
            likes: { count: 0, liked: false },
          }}
        />
        <TopicItem
          id="x"
          avatar={{ src: 'https://i.pravatar.cc/35' }}
          topicInfo={{
            topic: { title: 'teste teste teste 4444', url: '#' },
            author: { name: 'autor03', authorUrl: '#' },
            likes: { count: 15, liked: true },
          }}
        />
      </div>
    </div>
  )
}
