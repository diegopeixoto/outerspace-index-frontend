import { PinnedStatus, TopBarProps } from '@/types/layout'
import { FaChevronUp } from 'react-icons/fa6'

export default function Topbar({
  title,
  isPinned,
  isVisible,
  setIsVisible,
}: TopBarProps) {
  function handleVisibility() {
    setIsVisible!(!isVisible)
  }

  return (
    <div
      onClick={handleVisibility}
      className="cursor-pointer border-t border-[#424650] bg-[#353941] flex justify-between px-[15px] items-center h-[35px] text-xs font-bold"
    >
      <p className="text-xs uppercase text-slate-200">
        {title
          ? title
          : isPinned
            ? PinnedStatus.IS_PINNED
            : PinnedStatus.NOT_PINNED}
      </p>
      <button onClick={handleVisibility}>
        <FaChevronUp
          color="#e2e8f0"
          className={`rotate ${isVisible && 'rotate-180'}`}
        />
      </button>
    </div>
  )
}
