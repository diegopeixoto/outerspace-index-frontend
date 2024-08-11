import AvatarSkeleton from './AvatarSkeleton'
import TopicInfoSkeleton from './TopicInfoSkeleton'

export default function TopicItemSkeleton() {
  return (
    <div
      className={`${'bg-topic-item'}  px-[15px] py-[5px]  w-full min-h-[85px] flex `}
    >
      <div className="grid   grid-cols-[60px_1fr]  grid-rows-[85px] gap-x-[10px] gap-y-0 grid-flow-row items-center w-full">
        <AvatarSkeleton />
        <TopicInfoSkeleton />
      </div>
    </div>
  )
}
