import { Agent, load } from '@fingerprintjs/fingerprintjs'
import { useEffect, useState } from 'react'

let browserPromise: Promise<Agent> | undefined

if (typeof window !== 'undefined') {
  browserPromise = load()
}

const getBrowserId = async (): Promise<{ id: string }> => {
  const fp = await browserPromise
  const result = await fp!.get()
  return { id: result.visitorId }
}

export function useBrowserId() {
  const [browserId, setBrowserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchBrowserId = async () => {
      const { id } = await getBrowserId()
      setBrowserId(id)
    }

    fetchBrowserId()
  }, [])

  return browserId
}
