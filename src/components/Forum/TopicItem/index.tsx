import { AvatarProps, TopicItemProps } from '@/types/layout'
import Image from 'next/image'
export default function TopicItem({ avatar }: TopicItemProps) {
  return (
    <div className="bg-topic-item flex flex-col px-[15px] py-[5px]  w-full min-h-[85px]">
      <div className="flex gap-2">
        <Avatar src={avatar.src} />
      </div>
    </div>
  )
}

function Avatar({ src }: AvatarProps) {
  return (
    <div className="w-[50px] h-[50px] rounded-md overflow-hidden">
      <Image src={src} alt="avatar" width={50} height={50} />
    </div>
  )
}
