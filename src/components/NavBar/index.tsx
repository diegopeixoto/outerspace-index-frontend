import { navButtons } from '@/constants/navbar'
import { NavIcons, NavLabels } from '@/types/navbar'
import NavButton from './NavButton'

export default function NavBar() {
  return (
    <nav
      className="w-full max-w-[800px] h-[70px] bg-[rgba(53,57,65,0.80)] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15)]
     backdrop-blur-[2px] fixed bottom-0 py-1 px-[15px] flex justify-between items-center"
    >
      {navButtons.map((button) => (
        <NavButton
          key={button}
          icon={NavIcons[button as keyof typeof NavIcons]}
          label={NavLabels[button as keyof typeof NavLabels]}
          selected={button == 'FORUM'}
        />
      ))}
    </nav>
  )
}
