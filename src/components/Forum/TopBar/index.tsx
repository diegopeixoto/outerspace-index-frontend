import { PinnedStatus, TopBarProps } from '@/types/layout'
import { forwardRef } from 'react'
import { FaChevronUp } from 'react-icons/fa6'

const TopBar = forwardRef<HTMLDivElement, TopBarProps>(function TopBar(
  { title, isPinned, isOpen, setIsOpen },
  ref
) {
  return (
    <div
      onClick={() => setIsOpen && setIsOpen(!isOpen)}
      className="cursor-pointer border-t border-[#424650] bg-[#353941] flex justify-between px-[15px] items-center h-[35px] text-xs font-bold"
      ref={ref}
    >
      <p className="text-xs uppercase text-slate-200">
        {title
          ? title
          : isPinned
            ? PinnedStatus.IS_PINNED
            : PinnedStatus.NOT_PINNED}
      </p>
      <button onClick={() => setIsOpen && setIsOpen(!isOpen)}>
        <FaChevronUp
          color="#e2e8f0"
          className={`rotate ${isOpen && 'rotate-180'}`}
        />
      </button>
    </div>
  )
})
TopBar.displayName = 'TopBar'
export default TopBar
