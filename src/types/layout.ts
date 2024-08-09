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
  topicId: string
  count: number
  liked: boolean
  isPinned: boolean
  handleLike: handleLikeProps
}

export type handleLikeProps = (
  topicId: string,
  isPinned: boolean,
  action: string
) => void

export type TopicProps = {
  title: string
  url: string
}
export type AuthorProps = {
  name: string
  authorUrl: string
  avatar: AvatarProps
}
export type TopicInfoProps = {
  topic: TopicProps
  author: AuthorProps
  likes: LikeProps
}

export type TopicItemProps = {
  id: string
  isPinned: boolean
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
