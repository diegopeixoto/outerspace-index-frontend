import { supabase } from '../config/supabaseClient.js'
import logger from '../utils/logger.js'

export async function upsertLink(data, dryRun = false) {
  if (dryRun) {
    logger.info('Dry run enabled. Data not inserted:', data)
    return
  }

  const { error } = await supabase.from('links').upsert(data, {
    onConflict: ['url'],
    update: { title: data.title, is_pinned: data.is_pinned },
  })

  if (error) {
    logger.error('Supabase error:', error)
    throw error
  }

  logger.info('Data inserted successfully')
}
