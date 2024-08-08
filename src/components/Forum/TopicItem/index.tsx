import { TopicInfoProps, TopicItemProps } from '@/types/layout'
import Avatar from './Avatar'

export default function TopicItem({ avatar, id, topicInfo }: TopicItemProps) {
  return (
    <div className="bg-topic-item  px-[15px] py-[5px]  w-full min-h-[85px] flex ">
      <div className="grid grid-cols-[15%_1fr] grid-rows-[85px] gap-x-[10px] gap-y-0 grid-flow-row items-center w-full">
        <Avatar src={avatar.src} />
        <TopicInfo {...topicInfo} />
      </div>
    </div>
  )
}

function TopicInfo({ topic, author, likes }: TopicInfoProps) {
  return (
    <div className="flex flex-col w-full items-start">
      <a href={topic.url} className="text-lg text-slate-200 font-bold block">
        {topic.title}
      </a>
      <div className="flex w-full justify-between">
        <a className="block" href={author.authorUrl}>
          {author.name}
        </a>
        <p>{likes.count}</p>
      </div>
    </div>
  )
}
