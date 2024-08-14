import { iconMap, type NavButtonProps } from '@/types/navbar'
import { useRouter } from 'next/navigation'

export default function NavButton({
  icon,
  label,
  selected,
  href,
  action,
}: NavButtonProps) {
  const router = useRouter()
  function handleNavButtonCLick() {
    if (action === 'EXTERNAL') {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
    if (action === 'NAVIGATE') {
      router.push(href)
    }
  }
  const navStyle = {
    selected: 'text-slate-200 font-bold',
    hover: 'hover:text-slate-200 hover:font-bold',
  }
  const Icon = iconMap[icon]
  return (
    <button
      className={`flex-col flex items-center gap-y-1 cursor-pointer 
        ${navStyle.hover}`}
      onClick={handleNavButtonCLick}
    >
      <Icon size={24} className={`${selected && navStyle.selected} `} />
      <p className={`${selected && navStyle.selected}`}>{label}</p>
    </button>
  )
}
