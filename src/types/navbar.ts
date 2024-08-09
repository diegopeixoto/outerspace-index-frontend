import dynamic from 'next/dynamic'
import type { IconBaseProps } from 'react-icons'

export const iconMap: { [key: string]: React.ComponentType<IconBaseProps> } = {
  IoChatbubbleOutline: dynamic(() =>
    import('react-icons/io5').then((mod) => mod.IoChatbubbleOutline)
  ),
  FaPlus: dynamic(() => import('react-icons/fa').then((mod) => mod.FaPlus)),
  FaMedal: dynamic(() => import('react-icons/fa').then((mod) => mod.FaMedal)),
  HiDotsHorizontal: dynamic(() =>
    import('react-icons/hi').then((mod) => mod.HiDotsHorizontal)
  ),
}

export enum NavIcons {
  FORUM = 'IoChatbubbleOutline',
  ADD = 'FaPlus',
  GOLD = 'FaMedal',
  MORE = 'HiDotsHorizontal',
}

export enum NavLabels {
  FORUM = 'Forúns',
  ADD = 'Adicionar a lista',
  GOLD = 'Seja Gold',
  MORE = 'Mais',
}

export enum NavActions {
  NAVIGATE,
  EXTERNAL,
}

export type NavButtonProps = {
  icon: NavIcons
  label: NavLabels
  selected: boolean
}
