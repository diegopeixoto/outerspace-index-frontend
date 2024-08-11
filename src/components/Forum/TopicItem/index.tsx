import { TopicItemProps } from '@/types/layout'
import Avatar from './Avatar'
import TopicInfo from './TopicInfo'

export default function TopicItem({ id, isPinned, topicInfo }: TopicItemProps) {
  return (
    <div
      className={`${
        isPinned ? 'bg-topic-item-pinned' : 'bg-topic-item'
      }  px-[15px] py-[5px]  w-full min-h-[85px] flex `}
    >
      <div className="grid   grid-cols-[60px_1fr]  grid-rows-[85px] gap-x-[10px] gap-y-0 grid-flow-row items-center w-full">
        <Avatar src={topicInfo.author.avatar.src} />
        <TopicInfo {...topicInfo} />
      </div>
    </div>
  )
}
