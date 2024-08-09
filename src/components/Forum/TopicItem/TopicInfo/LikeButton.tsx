import type { LikeProps } from '@/types/layout'
import { useEffect, useState, type ReactNode } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'

export default function LikeButton(likes: LikeProps) {
  const [likeIcon, setLikeIcon] = useState<ReactNode>(<FaHeart />)
  const [liked, setLiked] = useState<boolean>(likes.liked)
  const [likesCount, setLikesCount] = useState<number>(likes.count)

  useEffect(() => {
    const iconConfig = {
      size: 20,
      likedColor: 'red',
      unlikedColor: '#e2e8f0',
    }

    if (liked) {
      setLikeIcon(
        <FaHeart size={iconConfig.size} color={iconConfig.likedColor} />
      )
    } else {
      setLikeIcon(
        <FaRegHeart size={iconConfig.size} color={iconConfig.unlikedColor} />
      )
    }
  }, [liked])

  function handleLike() {
    // TODO: Implement like functionality
    if (liked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="flex items-center gap-3" onClick={handleLike}>
      {likeIcon}
      <p className="">{likesCount}</p>
    </div>
  )
}
