const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

async function processTopicFile(filePath) {
  console.log(`Starting to process file: ${filePath}`);

  try {
    const topicData = require(filePath);
    const { url } = topicData;

    console.log(`Extracted URL from JSON: ${url}`);

    const domain = new URL(url).origin;
    console.log(`Extracted domain: ${domain}`);

    console.log('Fetching HTML content...');
    const response = await fetch(url);
    const html = await response.text();
    console.log('HTML content fetched successfully');

    const $ = cheerio.load(html);
    console.log('Cheerio loaded HTML content');

    // Extract and clean the title
    let title = $('div.p-title h1.p-title-value').text().trim();
    console.log(`Raw title extracted: "${title}"`);
    const isPinned = $('div.p-title span.label.label--royalBlue')
      .text()
      .includes('Tópico oficial');
    if (isPinned) {
      title = title.replace('Tópico oficial', '').trim();
    }
    console.log(`Cleaned title: "${title}"`);
    console.log(`Is pinned: ${isPinned}`);

    const userElement = $('li:contains("Iniciador do tópico") a.username');
    const authorName = userElement.text().trim();
    const authorLink = `${domain}${userElement.attr('href')}`;
    console.log(
      `Author information extracted: Name - "${authorName}", Link - "${authorLink}"`,
    );

    const avatarElement = $(
      `a[href="${userElement.attr('href')}"] img[alt="${authorName}"]`,
    );
    const avatarUrl = `${domain}${avatarElement.attr('src')}`;
    console.log(`Avatar image src extracted: "${avatarUrl}"`);

    if (!title || !url || !authorName || !authorLink || !avatarUrl) {
      throw new Error('Missing required data for insertion');
    }

    console.log('Preparing to insert data into Supabase...');
    console.log('Data to be inserted:', {
      title,
      url,
      author_name: authorName,
      author_link: authorLink,
      avatar_url: avatarUrl,
      is_pinned: isPinned,
    });
    const { data, error } = await supabase.from('links').upsert(
      {
        title,
        url,
        author_name: authorName,
        author_link: authorLink,
        avatar_url: avatarUrl,
        likes: 0,
        is_pinned: isPinned,
      },
      {
        onConflict: ['url'],
        update: { title, is_pinned: isPinned },
      },
    );

    if (error) {
      console.error('Supabase error:', error);
      console.error(
        'Supabase error details:',
        error.details,
        error.hint,
        error.code,
      );
      throw error;
    }
    console.log('Data inserted successfully:', data);
  } catch (error) {
    console.error('Error processing topic:', error);
    if (error.message) console.error('Error message:', error.message);
    if (error.stack) console.error('Error stack:', error.stack);
  }
}

const filePath = process.argv[2];
if (!filePath) {
  console.error('Please provide a file path as an argument');
  process.exit(1);
}

console.log('Script started');
processTopicFile(filePath)
  .then(() => console.log('Script finished'))
  .catch((error) => {
    console.error('Unhandled error in main process:', error);
    process.exit(1);
  });
