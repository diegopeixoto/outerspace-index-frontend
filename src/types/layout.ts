export type CategoryProps = {
  title: string
  description: string
}

export type TopBarProps = {
  title: string
  isVisible?: boolean
  setIsVisible?: (visible: boolean) => void
}

export type AvatarProps = {
  src: string
}

export type TopicItemProps = {
  avatar: AvatarProps
}

export type ForumProps = {
  topbar: TopBarProps
  topicItem?: TopicItemProps[]
}
