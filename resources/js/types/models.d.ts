export interface Authenticatable {
  id: number;
  name: string;
}

export interface User extends Authenticatable {
  email: string;
  email_verified_at: string;
}

export interface Administrator extends Authenticatable, HasTimestamps {
  username: string;
  avatar: string | null;
}

export interface Article extends HasTimestamps {
  id: number;
  title: string;
  description?: string | null;
  content?: string | null;
  tags?: Tag[];
  slug?: string | null;
  published_at: string | Date | null;
  visits_count?: number | null;
}

export interface Tag {
  id: number;
  name: string;
  type: string | null;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface HasTimestamps {
  created_at: string | Date;
  updated_at: string | Date;
}

export interface SoftDelete {
  deleted_at: string | Date;
}
