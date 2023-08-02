export interface Category {
  id: number;
  title: string;
}

export interface Article {
  id: number;
  title: string;
  description?: string | null;
  content?: string;
  slug?: string | null;
  category_id: number;
  published_at: string | Date;
  created_at: string | Date;
  updated_at: string | Date;
  category?: Category;
}
