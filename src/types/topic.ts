export type Topic = {
  id: string;
  title: string;
  url: string;
  author_name: string;
  author_link: string;
  author_avatar?: string;
  likes: number;
  is_pinned: boolean;
  liked: boolean;
  created_at: string;
};
