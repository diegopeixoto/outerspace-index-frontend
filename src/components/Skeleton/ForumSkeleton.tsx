import { useState } from 'react'
import TopBarSkeleton from './TopBarSkeleton'
import { TopBarProps } from '@/types/layout'
import TopicItemSkeleton from './TopicItemSkeleton'

export default function ForumSkeleton({
  quantity,
  noTopBar,
}: {
  quantity: number
  noTopBar?: boolean
}) {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const topbar: TopBarProps = {
    isVisible: isVisible,
    setIsVisible,
  }
  return (
    <div className="w-full flex-col">
      {noTopBar ? '' : <TopBarSkeleton {...topbar} />}
      <div
        className={`bg-[#2D3037] shadow-[inset_0px_5px_15px_0px_rgba(0,0,0,0.08) 
                    flex h-fit py-1  flex-col items-start gap-4 self-stretch
                    ${isVisible ? 'flex' : 'hidden'} 
                     `}
      >
        {[...Array(quantity)].map((_, index) => (
          <TopicItemSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
