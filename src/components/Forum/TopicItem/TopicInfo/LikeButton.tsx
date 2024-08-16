import type { LikeButtonProps } from '@/types/layout'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'

export default function LikeButton(props: LikeButtonProps) {
  const [likeIcon, setLikeIcon] = useState<ReactNode>(<FaHeart />)
  const { handleLike, isPinned, topicId, count, liked } = props

  useEffect(() => {
    const iconConfig = {
      size: 20,
      likedColor: 'red',
      unlikedColor: '#e2e8f0',
      hoverColor: 'white',
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

  function handleLikeButton() {
    handleLike(topicId, isPinned, liked ? 'unlike' : 'like')
  }

  return (
    <AnimatePresence mode="sync">
      <div onClick={handleLikeButton}>
        <motion.div
          className="flex items-center gap-3 cursor-pointer hover:text-white 
      transition-all hover:scale-[1.15] hover-font-bold"
          key={liked ? 'liked' : 'unliked'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {likeIcon}
          <p className="">{count}</p>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
