import fs from 'fs/promises'
import logger from './logger.js'

export async function loadJson(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    logger.error(`Error loading JSON from ${filePath}:`, error)
    throw error
  }
}
