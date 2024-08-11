export default function TopicInfoSkeleton() {
  return (
    <div className="flex flex-col w-full items-start">
      <div className="bg-slate-400 h-6 w-3/4 mb-2 rounded animate-pulse"></div>
      <div className="flex w-full justify-between">
        <div className="bg-gray-300 h-4 w-1/4 rounded animate-pulse"></div>
        <div className="bg-gray-300 h-4 w-1/6 rounded animate-pulse"></div>
      </div>
    </div>
  )
}
