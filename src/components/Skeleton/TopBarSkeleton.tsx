import { PinnedStatus, TopBarProps } from '@/types/layout'
import { FaChevronUp } from 'react-icons/fa6'

export default function TopbarSkeleton({ isOpen, setIsOpen }: TopBarProps) {
  function handleOpen() {
    setIsOpen!(!isOpen)
  }

  return (
    <div
      onClick={handleOpen}
      className="cursor-pointer border-t border-[#424650] bg-[#353941] flex justify-between px-[15px] items-center h-[35px] text-xs font-bold"
    >
      <span className="text-xs uppercase text-slate-200 animate-pulse px-5 w-28 rounded-md h-4 "></span>
      <button onClick={handleOpen}>
        <FaChevronUp
          color="#e2e8f0"
          className={`rotate ${isOpen && 'rotate-180'}`}
        />
      </button>
    </div>
  )
}
