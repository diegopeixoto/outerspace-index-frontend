import type { TopicItemProps } from './layout'

export type TopicAPIResponse = {
  topics: TopicItemProps[]
  page: number
  pageSize: number
}
