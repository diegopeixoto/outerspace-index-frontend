import { TopicInfoProps, TopicItemProps } from '@/types/layout'
import Avatar from './Avatar'

export default function TopicItem({ avatar, id, topicInfo }: TopicItemProps) {
  return (
    <div className="bg-topic-item  px-[15px] py-[5px]  w-full min-h-[85px]">
      <div className="flex gap-3 h-full items-start">
        <Avatar src={avatar.src} />
        <TopicInfo {...topicInfo} />
      </div>
    </div>
  )
}

function TopicInfo({ title, author, likes }: TopicInfoProps) {
  return (
    <div className="flex flex-col w-full">
      <p className="text-lg text-slate-200 font-bold">{title}</p>
      <div className="flex w-full justify-between">
        <p>{author}</p>
        <p>{likes.count}</p>
      </div>
    </div>
  )
}
