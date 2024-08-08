import fetch from 'node-fetch'

export async function fetchHtml(url) {
  const response = await fetch(url)
  return response.text()
}
