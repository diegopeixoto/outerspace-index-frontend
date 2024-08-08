'use client'

import Category from '@/components/Category'
import Forum from '@/components/Forum'
import Header from '@/components/Header'

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
        <Forum topbar={{ title: 'Tópico Oficial / Fixo' }} />
      </main>
    </>
  )
}
