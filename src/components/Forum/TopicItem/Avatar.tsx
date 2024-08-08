import { AvatarProps } from '@/types/layout'

export default function Avatar({ src }: AvatarProps) {
  return (
    <img
      src={src}
      alt="avatar"
      width="100%"
      height="100%"
      className="items-start rounded-md"
      style={{ objectFit: 'contain' }}
    />
  )
}
