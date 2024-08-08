import { LikeProps, TopicInfoProps } from '@/types/layout'

export default function TopicInfo({ topic, author, likes }: TopicInfoProps) {
  return (
    <div className="flex flex-col w-full items-start">
      <a href={topic.url} className="text-lg text-slate-200 font-bold block">
        {topic.title}
      </a>
      <div className="flex w-full justify-between">
        <a className="block" href={author.authorUrl}>
          {author.name}
        </a>
        <LikeButton {...likes} />
      </div>
    </div>
  )
}

function LikeButton(likes: LikeProps) {
  return <p>{likes.count}</p>
}
