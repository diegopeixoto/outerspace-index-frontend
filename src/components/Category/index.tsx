import { CategoryProps } from '@/types/layout'

function Category({ title, description }: CategoryProps) {
  return (
    <div className="flex gap-y-1 flex-col justify-center px-4 py-6 w-full bg-[#2D3037] rounded-md min-h-[173px]  shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15)]">
      <h1 className="text-2xl font-medium leading-7 text-slate-200">{title}</h1>
      <p className="leading-5 text-slate-500">{description}</p>
    </div>
  )
}

export default Category
