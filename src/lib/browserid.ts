import { Agent, load } from '@fingerprintjs/fingerprintjs'

let browserPromise: Promise<Agent> | undefined

if (typeof window !== 'undefined') {
  browserPromise = load()
}

export const getBrowserId = async (): Promise<{ id: string }> => {
  const fp = await browserPromise
  const result = await fp!.get()
  return { id: result.visitorId }
}
