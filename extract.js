const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
)

async function processTopicFile(filePath) {
  console.log(`Starting to process file: ${filePath}`)

  try {
    const topicData = require(filePath)
    const { url } = topicData
    console.log(`Extracted URL from JSON: ${url}`)

    console.log('Fetching HTML content...')
    const response = await fetch(url)
    const html = await response.text()
    console.log('HTML content fetched successfully')

    const $ = cheerio.load(html)
    console.log('Cheerio loaded HTML content')

    // Extract and clean the title
    let title = $('title').text().trim()
    console.log(`Raw title extracted: "${title}"`)
    title = title.replace(
      ' | Fórum Outer Space - O maior fórum de games do Brasil',
      '',
    )
    console.log(`Cleaned title: "${title}"`)

    const userElement = $('li:contains("Iniciador do tópico") a.username')
    const authorName = userElement.text().trim()
    const authorLink = userElement.attr('href')
    console.log(
      `Author information extracted: Name - "${authorName}", Link - "${authorLink}"`,
    )

    if (!title || !url || !authorName || !authorLink) {
      throw new Error('Missing required data for insertion')
    }

    console.log('Preparing to insert data into Supabase...')
    console.log('Data to be inserted:', {
      title,
      url,
      author_name: authorName,
      author_link: authorLink,
    })
    const { data, error } = await supabase.from('links').insert({
      title,
      url,
      author_name: authorName,
      author_link: authorLink,
      likes: 0,
      is_pinned: false,
    })

    if (error) {
      console.error('Supabase error:', error)
      console.error(
        'Supabase error details:',
        error.details,
        error.hint,
        error.code,
      )
      throw error
    }
    console.log('Data inserted successfully:', data)
  } catch (error) {
    console.error('Error processing topic:', error)
    if (error.message) console.error('Error message:', error.message)
    if (error.stack) console.error('Error stack:', error.stack)
  }
}

const filePath = process.argv[2]
if (!filePath) {
  console.error('Please provide a file path as an argument')
  process.exit(1)
}

console.log('Script started')
processTopicFile(filePath)
  .then(() => console.log('Script finished'))
  .catch((error) => {
    console.error('Unhandled error in main process:', error)
    process.exit(1)
  })
