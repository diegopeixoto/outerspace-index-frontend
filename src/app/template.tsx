'use client'
import NavBar from '@/components/NavBar'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NavBar />
    </>
  )
}
