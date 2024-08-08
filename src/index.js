import path from 'path'

import logger from './utils/logger.js'
import { processTopicFile } from './services/processTopicService.js'

const filePath = process.argv[2]
const absoluteFilePath = path.resolve(filePath)
const dryRun = process.argv.includes('--dry-run')

if (!filePath) {
  logger.error('Please provide a file path as an argument')
  process.exit(1)
}

logger.info('Script started')
processTopicFile(absoluteFilePath, dryRun)
  .then(() => logger.info('Script finished'))
  .catch((error) => {
    logger.error('Unhandled error in main process:', error)
    process.exit(1)
  })
