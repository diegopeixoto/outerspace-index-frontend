import type { LikeProps } from '@/types/layout'
import { use, useEffect, useState, type ReactNode } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'

export default function LikeButton(likes: LikeProps) {
  const [likeIcon, setLikeIcon] = useState<ReactNode>(<FaHeart />)
  const [liked, setLiked] = useState<boolean>(likes.liked)
  const [likesCount, setLikesCount] = useState<number>(likes.count)
  const { handleLike, isPinned, topicId } = likes

  useEffect(() => {
    setLikesCount(likes.count)
  }, [likes.count])

  useEffect(() => {
    setLiked(likes.liked)
    const iconConfig = {
      size: 20,
      likedColor: 'red',
      unlikedColor: '#e2e8f0',
    }

    if (likes.liked) {
      setLikeIcon(
        <FaHeart size={iconConfig.size} color={iconConfig.likedColor} />
      )
    } else {
      setLikeIcon(
        <FaRegHeart size={iconConfig.size} color={iconConfig.unlikedColor} />
      )
    }
  }, [likes.liked])

  function handleLikeButton() {
    if (liked) {
      handleLike(topicId, isPinned, 'like')
    } else {
      handleLike(topicId, isPinned, 'unlike')
    }
    setLiked(!liked)
  }

  return (
    <div className="flex items-center gap-3" onClick={handleLikeButton}>
      {likeIcon}
      <p className="">{likesCount}</p>
    </div>
  )
}
