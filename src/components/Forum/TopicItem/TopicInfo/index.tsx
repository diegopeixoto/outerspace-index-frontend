import { TopicInfoProps } from '@/types/layout'
import LikeButton from './LikeButton'
import Link from 'next/link'

export default function TopicInfo({ topic, author, likes }: TopicInfoProps) {
  return (
    <div className="flex flex-col w-full items-start">
      <Link
        href={topic.url}
        className={`${topic.title.length > 30 ? 'text-[14px]' : 'text-md'}
         text-slate-200 font-bold block`}
        target="_blank"
        rel="noreferrer"
      >
        {topic.title}
      </Link>
      <div className="flex w-full justify-between">
        <Link
          className="block"
          href={author.authorUrl}
          target="_blank"
          rel="noreferrer"
        >
          {author.name}
        </Link>
        <LikeButton {...likes} />
      </div>
    </div>
  )
}
