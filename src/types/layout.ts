export type CategoryProps = {
  title: string
  description: string
}

export type TopBarProps = {
  title?: string
  isPinned?: boolean
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

export type TopicProps = {
  title: string
  url: string
}
export type AuthorProps = {
  name: string
  authorUrl: string
}
export type TopicInfoProps = {
  topic: TopicProps
  author: AuthorProps
  likes: LikeProps
}

export type TopicItemProps = {
  id: string
  isPinned: boolean
  avatar: AvatarProps
  topicInfo: TopicInfoProps
}

export type ForumProps = {
  title?: string
  topbar?: TopBarProps
  topicList: TopicItemProps[]
}

export enum PinnedStatus {
  IS_PINNED = 'Tópico Oficial / Fixo',
  NOT_PINNED = 'Tópico Regular',
}