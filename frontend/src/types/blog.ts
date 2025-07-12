export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  featuredImage?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  isPublished: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    canonicalUrl?: string;
    ogImage?: string;
    ogDescription?: string;
  };
  views: number;
  likes: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  postCount: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export interface BlogListResponse {
  posts: BlogPost[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  author?: string;
  searchQuery?: string;
  sortBy?: 'newest' | 'oldest' | 'popular' | 'mostViewed';
  page?: number;
  limit?: number;
}

export interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category: string;
  publishedAt: string;
  readingTime: number;
}
