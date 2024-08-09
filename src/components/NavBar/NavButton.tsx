import { iconMap, type NavButtonProps } from '@/types/navbar'

export default function NavButton({ icon, label, selected }: NavButtonProps) {
  const navStyle = {
    selected: 'text-slate-200 font-bold',
    hover: 'hover:text-slate-200 hover:font-bold',
  }
  const Icon = iconMap[icon]
  return (
    <button
      className={`flex-col flex items-center gap-y-1 cursor-pointer ${navStyle.hover}`}
    >
      <Icon size={24} className={`${selected && navStyle.selected} `} />
      <p className={`${selected && navStyle.selected}`}>{label}</p>
    </button>
  )
}
