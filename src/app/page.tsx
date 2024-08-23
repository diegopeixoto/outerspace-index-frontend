'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useBrowserId } from '@/lib/browserid'
import { LikeProvider } from '@/context/LikeContext'
import { useTopicsData } from '@/hooks/useTopicsData'
import Header from '@/components/Header'
import Category from '@/components/Category'
import Forum from '@/components/Forum'
import ForumSkeleton from '@/components/Skeleton/ForumSkeleton'
import { AnimatePresence, motion } from 'framer-motion'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeContent />
    </QueryClientProvider>
  )
}

function HomeContent() {
  const browserId = useBrowserId()
  const { topics, isLoading, setTopics } = useTopicsData(browserId!)

  return (
    <>
      <Header />
      <LikeProvider browserId={browserId!} setTopics={setTopics}>
        <main className="max-w-[800px] bg-[#1b1c21]">
          <div className="flex flex-col justify-center p-4 w-full">
            <Category
              title="PC, Hardware & Gadgets - Discussão"
              description="Espaço para tudo sobre PCs e gadgets. Overclock, placas de vídeo, processadores e objetos de tecnologia em geral."
            />
          </div>
          <AnimatePresence mode="sync">
            <motion.div
              key={`${isLoading}-${topics.pinned.length}-${topics.regular.length}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75 }}
            >
              {isLoading ? (
                <>
                  <ForumSkeleton quantity={1} />
                  <ForumSkeleton quantity={8} />
                </>
              ) : (
                <>
                  <Forum topicList={topics.pinned} />
                  <Forum topicList={topics.regular} />
                  <div className="mt-14"></div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </LikeProvider>
    </>
  )
}
