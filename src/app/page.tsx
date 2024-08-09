'use client'

import Category from '@/components/Category'
import Forum from '@/components/Forum'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { TopicItemProps } from '@/types/layout'

const mockPinnedTopicList: TopicItemProps[] = [
  {
    id: '1',
    avatar: { src: 'https://i.pravatar.cc/30' },
    isPinned: true,
    topicInfo: {
      topic: { title: 'teste teste teste 111', url: '#' },
      author: { name: 'autor01', authorUrl: '#' },
      likes: { count: 0, liked: false },
    },
  },
]
const mockNormalTopicList: TopicItemProps[] = [
  {
    id: '2',
    avatar: { src: 'https://i.pravatar.cc/30' },
    isPinned: false,
    topicInfo: {
      topic: { title: 'teste teste teste 222', url: '#' },
      author: { name: 'autor02', authorUrl: '#' },
      likes: { count: 5, liked: true },
    },
  },
  {
    id: '3',
    avatar: { src: 'https://i.pravatar.cc/30' },
    isPinned: false,
    topicInfo: {
      topic: { title: 'teste teste teste 333', url: '#' },
      author: { name: 'autor03', authorUrl: '#' },
      likes: { count: 10, liked: true },
    },
  },
]

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-[800px] bg-[#1b1c21]">
        <div className="flex flex-col justify-center p-4 w-full">
          <Category
            title="PC, Hardware & Gadgets - Discussão"
            description="Espaço para tudo sobre PCs e gadgets. Overclock, placas de vídeo, processadores e objetos de tecnologia em geral."
          />
        </div>
        <Forum topicList={mockPinnedTopicList} />
        <Forum topicList={mockNormalTopicList} />
        <NavBar />
      </main>
    </>
  )
}
