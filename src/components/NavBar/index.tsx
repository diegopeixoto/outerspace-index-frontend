import { navButtons } from '@/constants/navbar'
import { NavActions, NavIcons, NavLabels, NavLinks } from '@/types/navbar'
import NavButton from './NavButton'
import { usePathname } from 'next/navigation'

export default function NavBar() {
  const path = usePathname()
  return (
    <nav
      className="w-full max-w-[800px] h-[70px] bg-[rgba(53,57,65,0.80)] 
      shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15)]
      backdrop-blur-[2px] fixed bottom-0 py-1 px-[15px] grid 
      grid-cols-[15%,30%,20%,10%] grid-rows-1 gap-x-4 gap-y-0 text-nowrap
      auto-rows-fr items-center justify-between"
    >
      {navButtons.map((button) => (
        <NavButton
          key={button}
          href={NavLinks[button as keyof typeof NavLinks]}
          action={NavActions[button as keyof typeof NavActions]}
          icon={NavIcons[button as keyof typeof NavIcons]}
          label={NavLabels[button as keyof typeof NavLabels]}
          selected={path == NavLinks[button as keyof typeof NavLinks]}
        />
      ))}
    </nav>
  )
}
