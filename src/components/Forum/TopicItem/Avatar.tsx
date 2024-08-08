import { AvatarProps } from '@/types/layout'
import Image from 'next/image'

export default function Avatar({ src }: AvatarProps) {
  return (
    <div className="w-[50px] h-[50px]">
      <Image
        src={src}
        alt="avatar"
        width={50}
        height={50}
        className="rounded-md object-contain"
      />
    </div>
  )
}
