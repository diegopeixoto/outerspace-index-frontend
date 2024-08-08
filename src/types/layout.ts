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

export type LikeProps = {
  count: number
  liked: boolean
}

export type TopicInfoProps = {
  title: string
  author: string
  likes: LikeProps
}

export type TopicItemProps = {
  id: string
  avatar: AvatarProps
  topicInfo: TopicInfoProps
}

export type ForumProps = {
  topbar: TopBarProps
  topicItem?: TopicItemProps[]
}
