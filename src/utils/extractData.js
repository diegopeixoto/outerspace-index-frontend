import { load } from 'cheerio'
import logger from './logger.js'

export function extractData(html, url) {
  const $ = load(html)
  logger.info('Cheerio loaded HTML content')
  const domain = new URL(url).origin
  logger.info(`Extracted domain: ${domain}`)

  let title = $('div.p-title h1.p-title-value').text().trim()
  logger.info(`Raw title extracted: "${title}"`)
  const isPinned = $('div.p-title span.label.label--royalBlue')
    .text()
    .includes('Tópico oficial')

  if (isPinned) {
    title = title.replace('Tópico oficial', '').trim()
  }

  logger.info(`Cleaned title: "${title}"`)
  logger.info(`Is pinned: ${isPinned}`)

  const userElement = $('li:contains("Iniciador do tópico") a.username')
  const authorName = userElement.text().trim()
  const authorLink = `${domain}${userElement.attr('href')}`

  logger.info(
    `Author information extracted: Name - "${authorName}", Link - "${authorLink}"`,
  )

  const avatarElement = $(
    `a[href="${userElement.attr('href')}"] img[alt="${authorName}"]`,
  )
  const avatarUrl = `${domain}${avatarElement.attr('src')}`
  logger.info(`Avatar image src extracted: "${avatarUrl}"`)

  return {
    title,
    url,
    author_name: authorName,
    author_link: authorLink,
    avatar_url: avatarUrl,
    is_pinned: isPinned,
  }
}
