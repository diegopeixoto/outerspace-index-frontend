import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('cursor') || '0')
  const pageSize = parseInt(searchParams.get('limit') || '10')
  const browser_id = searchParams.get('browser_id')
  const pinned = searchParams.get('pinned') === 'true'

  const { data: linksData, error: linksError } = await supabase
    .from('links')
    .select(
      'id, title, url, author_name, author_link, avatar_url, likes, is_pinned, created_at'
    )
    .order('likes', { ascending: false })
  // .range(start, end)

  if (linksError) {
    return NextResponse.json({ error: linksError }, { status: 500 })
  }

  const { data: likesData, error: likesError } = await supabase
    .from('likes')
    .select('topic_id')
    .eq('browser_id', browser_id)

  if (likesError) {
    return NextResponse.json({ error: likesError }, { status: 500 })
  }

  const likedLinksSet = new Set(likesData?.map((like) => like.topic_id))

  const filteredLinks =
    linksData?.filter((link) => link.is_pinned === pinned) || []

  const allData = filteredLinks.map((topic) => ({
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
  return NextResponse.json({ topics: allData, page, pageSize })
}

export async function POST(request: Request) {
  const { topic_id, browser_id } = await request.json()

  const { data: existingLike, error: checkError } = await supabase
    .from('likes')
    .select('id')
    .match({ topic_id, browser_id })
    .single()

  if (checkError && checkError.code !== 'PGRST116') {
    return NextResponse.json(
      { error: 'Error checking like status' },
      { status: 500 }
    )
  }

  if (existingLike) {
    const { error: deleteError } = await supabase
      .from('likes')
      .delete()
      .match({ topic_id, browser_id })

    if (deleteError) {
      return NextResponse.json(
        { error: 'Error removing like' },
        { status: 500 }
      )
    }

    await supabase.rpc('decrement_likes', { row_id: topic_id })

    return NextResponse.json({ message: 'Like removed successfully' })
  } else {
    const { error: insertError } = await supabase
      .from('likes')
      .insert({ topic_id, browser_id })

    if (insertError) {
      return NextResponse.json({ error: 'Error adding like' }, { status: 500 })
    }

    await supabase.rpc('increment_likes', { row_id: topic_id })

    return NextResponse.json({ message: 'Like added successfully' })
  }
}
