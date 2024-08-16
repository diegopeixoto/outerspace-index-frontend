import { useEffect, useState, type ReactNode } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { AnimatePresence, motion } from 'framer-motion'
import { useLikeContext } from '@/context/LikeContext'
import type { LikeProps } from '@/types/layout'

export default function LikeButton({
  topicId,
  isPinned,
  count,
  liked,
}: LikeProps) {
  const [likeIcon, setLikeIcon] = useState<ReactNode>(<FaHeart />)
  const { handleLike } = useLikeContext()

  useEffect(() => {
    const iconConfig = {
      size: 20,
      likedColor: 'red',
      unlikedColor: '#e2e8f0',
    }

    setLikeIcon(
      liked ? (
        <FaHeart size={iconConfig.size} color={iconConfig.likedColor} />
      ) : (
        <FaRegHeart size={iconConfig.size} color={iconConfig.unlikedColor} />
      )
    )
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
