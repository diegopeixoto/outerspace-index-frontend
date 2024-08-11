import type { TopicItemProps } from './layout'

export type TopicAPIResponse = {
  topics: TopicItemProps[]
  page: number
  pageSize: number
}
export type TopicType = {
  regular: TopicItemProps[]
  pinned: TopicItemProps[]
}
