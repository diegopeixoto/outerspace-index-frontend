import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { TopicItemProps } from '@/types/layout'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

async function fetchLinks(pinned: boolean) {
  const { data, error } = await supabase
    .from('links')
    .select(
      'id, title, url, author_name, author_link, avatar_url, likes, is_pinned, created_at'
    )
    .order('likes', { ascending: false })
    .eq('is_pinned', pinned)

  if (error) throw new Error('Error fetching links')
  return data
}

async function fetchLikes(browser_id: string) {
  const { data, error } = await supabase
    .from('likes')
    .select('topic_id')
    .eq('browser_id', browser_id)

  if (error) throw new Error('Error fetching likes')
  return new Set(data?.map((like) => like.topic_id))
}

function transformTopics(
  linksData: any[],
  likedLinksSet: Set<string>
): TopicItemProps[] {
  return linksData.map((topic) => ({
    id: topic.id,
    topicInfo: {
      topic: { title: topic.title, url: topic.url },
      author: {
        name: topic.author_name,
        authorUrl: topic.author_link,
        avatar: { src: topic.avatar_url },
      },
      likes: {
        count: topic.likes,
        liked: likedLinksSet.has(topic.id),
      },
    },
    isPinned: topic.is_pinned,
    created_at: topic.created_at,
  }))
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const browser_id = searchParams.get('browser_id')
    const pinned = searchParams.get('pinned') === 'true'

    if (!browser_id) throw new Error('Browser ID is required')

    const [linksData, likedLinksSet] = await Promise.all([
      fetchLinks(pinned),
      fetchLikes(browser_id),
    ])

    const allData = transformTopics(linksData, likedLinksSet)

    return NextResponse.json({ topics: allData })
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}

async function checkExistingLike(topic_id: string, browser_id: string) {
  const { data, error } = await supabase
    .from('likes')
    .select('id')
    .match({ topic_id, browser_id })
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new Error('Error checking like status')
  }

  return data
}

async function removeLike(topic_id: string, browser_id: string) {
  const { error: deleteError } = await supabase
    .from('likes')
    .delete()
    .match({ topic_id, browser_id })

  if (deleteError) throw new Error('Error removing like')

  await supabase.rpc('decrement_likes', { row_id: topic_id })
}

async function addLike(topic_id: string, browser_id: string) {
  const { error: insertError } = await supabase
    .from('likes')
    .insert({ topic_id, browser_id })

  if (insertError) throw new Error('Error adding like')

  await supabase.rpc('increment_likes', { row_id: topic_id })
}

export async function POST(request: Request) {
  try {
    const { topic_id, browser_id } = await request.json()

    if (!topic_id || !browser_id) {
      throw new Error('Topic ID and Browser ID are required')
    }

    const existingLike = await checkExistingLike(topic_id, browser_id)

    if (existingLike) {
      await removeLike(topic_id, browser_id)
      return NextResponse.json({ message: 'Like removed successfully' })
    } else {
      await addLike(topic_id, browser_id)
      return NextResponse.json({ message: 'Like added successfully' })
    }
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}
