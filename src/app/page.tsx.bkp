'use client';

import { useEffect, useRef, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { Topic } from '@/types/topic';

const LIMIT = 10;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getKey = (
  pageIndex: number,
  previousPageData: Topic[],
  isPinned: boolean,
) => {
  if (previousPageData && !previousPageData.length) return null;
  return `/api/topics?page=${pageIndex}&pinned=${isPinned}`;
};

function useBrowserId() {
  const [browserId, setBrowserId] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem('browserId');
    if (!id) {
      id = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('browserId', id);
    }
    setBrowserId(id);
  }, []);

  return browserId;
}

export default function Home() {
  const [isPinned, setIsPinned] = useState(false);
  const browserId = useBrowserId();

  const { data, error, size, setSize, mutate } = useSWRInfinite<Topic[]>(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, isPinned),
    fetcher,
  );

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const topics = data ? ([] as Topic[]).concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === 'undefined';
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoadingMore &&
          !isReachingEnd &&
          !isPinned
        ) {
          setSize(size + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [isLoadingMore, isReachingEnd, setSize, size, isPinned]);

  const handleLike = async (topicId: string) => {
    if (!browserId) return;

    const response = await fetch('/api/topics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic_id: topicId,
        browser_id: browserId,
        action: 'like',
      }),
    });

    if (response.ok) {
      mutate();
    }
  };

  const handleUnlike = async (topicId: string) => {
    if (!browserId) return;

    const response = await fetch('/api/topics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic_id: topicId,
        browser_id: browserId,
        action: 'unlike',
      }),
    });

    if (response.ok) {
      mutate();
    }
  };

  if (error) return <div>Erro ao carregar tópicos</div>;
  if (isLoadingInitialData) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fórum</h1>
      <button
        onClick={() => setIsPinned(!isPinned)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isPinned ? 'Ver todos os tópicos' : 'Ver tópicos fixos'}
      </button>
      <ul className="space-y-4">
        {topics.map((topic) => (
          <li key={topic.id} className="border p-4 rounded-lg">
            <a
              href={topic.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {topic.title}
            </a>
            <p className="text-sm text-gray-600">
              Iniciado por:{' '}
              <a href={topic.author_link} className="hover:underline">
                {topic.author_name}
              </a>
            </p>
            <p className="text-sm text-gray-600">Likes: {topic.likes}</p>
            <button
              onClick={() =>
                topic.liked ? handleUnlike(topic.id) : handleLike(topic.id)
              }
              className={`mt-2 px-3 py-1 rounded ${topic.liked ? 'bg-red-500' : 'bg-green-500'} text-white`}
            >
              {topic.liked ? 'Remover like' : 'Like'}
            </button>
            {topic.is_pinned && (
              <span className="ml-2 text-sm text-gray-500">📌 Fixado</span>
            )}
          </li>
        ))}
      </ul>
      {!isPinned && !isReachingEnd && (
        <div ref={loadMoreRef} className="h-10" />
      )}
      {isLoadingMore && <div>Carregando mais...</div>}
      {isReachingEnd && <div>Não há mais tópicos para carregar</div>}
    </div>
  );
}
