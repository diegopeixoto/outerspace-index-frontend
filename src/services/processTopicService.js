import { fetchHtml } from '../utils/fetchHtml.js'
import { extractData } from '../utils/extractData.js'
import { upsertLink } from './supabaseService.js'
import { loadJson } from '../utils/loadJson.js'
import logger from '../utils/logger.js'

export async function processTopicFile(filePath, dryRun = false) {
  logger.info(`Starting to process file: ${filePath}`)

  try {
    const topicData = await loadJson(filePath)
    logger.info(`JSON Processed: ${filePath}`)
    const { url } = topicData.default || topicData

    logger.info(`Extracted URL from JSON: ${url}`)

    const html = await fetchHtml(url)
    logger.info('HTML content fetched successfully')
    const data = extractData(html, url)

    if (
      !data.title ||
      !data.url ||
      !data.author_name ||
      !data.author_link ||
      !data.avatar_url
    ) {
      throw new Error('Missing required data for insertion')
    }

    logger.info('Preparing to insert data into Supabase...')

    await upsertLink(data, dryRun)
  } catch (error) {
    logger.error('Error processing topic:', error)
    throw error
  }
}
