import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const { data: pinnedData, error: pinnedError } = await supabase
    .from('links')
    .select(
      'id, title, url, author_name, author_link, likes, is_pinned, created_at',
    )
    .eq('is_pinned', true)
    .order('likes', { ascending: false });

  const { data: unpinnedData, error: unpinnedError } = await supabase
    .from('links')
    .select(
      'id, title, url, author_name, author_link, likes, is_pinned, created_at',
    )
    .eq('is_pinned', false)
    .order('likes', { ascending: false })
    .range(start, end);

  if (pinnedError || unpinnedError) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }

  const allData = [...(pinnedData || []), ...(unpinnedData || [])];
  return NextResponse.json({ data: allData, page, pageSize });
}

export async function POST(request: Request) {
  const { topic_id, browser_id } = await request.json();

  const { data: existingLike, error: checkError } = await supabase
    .from('likes')
    .select('id')
    .match({ topic_id, browser_id })
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    return NextResponse.json(
      { error: 'Error checking like status' },
      { status: 500 },
    );
  }

  if (existingLike) {
    const { error: deleteError } = await supabase
      .from('likes')
      .delete()
      .match({ topic_id, browser_id });

    if (deleteError) {
      return NextResponse.json(
        { error: 'Error removing like' },
        { status: 500 },
      );
    }

    await supabase.rpc('decrement_likes', { row_id: topic_id });

    return NextResponse.json({ message: 'Like removed successfully' });
  } else {
    const { error: insertError } = await supabase
      .from('likes')
      .insert({ topic_id, browser_id });

    if (insertError) {
      return NextResponse.json({ error: 'Error adding like' }, { status: 500 });
    }

    await supabase.rpc('increment_likes', { row_id: topic_id });

    return NextResponse.json({ message: 'Like added successfully' });
  }
}
