import { BlogPost, BlogCategory, BlogTag, BlogListResponse, BlogFilters, RelatedPost } from '../types/blog';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class BlogService {
  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Get blog posts with filtering and pagination
  async getBlogPosts(filters: BlogFilters = {}): Promise<BlogListResponse> {
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.tag) params.append('tag', filters.tag);
    if (filters.author) params.append('author', filters.author);
    if (filters.searchQuery) params.append('q', filters.searchQuery);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const queryString = params.toString();
    const endpoint = `/blog/posts${queryString ? `?${queryString}` : ''}`;
    
    return this.fetchAPI(endpoint);
  }

  // Get single blog post by slug
  async getBlogPost(slug: string): Promise<BlogPost> {
    return this.fetchAPI(`/blog/posts/${slug}`);
  }

  // Get related posts
  async getRelatedPosts(postId: string, limit: number = 3): Promise<RelatedPost[]> {
    return this.fetchAPI(`/blog/posts/${postId}/related?limit=${limit}`);
  }

  // Get blog categories
  async getBlogCategories(): Promise<BlogCategory[]> {
    return this.fetchAPI('/blog/categories');
  }

  // Get blog tags
  async getBlogTags(): Promise<BlogTag[]> {
    return this.fetchAPI('/blog/tags');
  }

  // Increment post views
  async incrementViews(postId: string): Promise<void> {
    await this.fetchAPI(`/blog/posts/${postId}/views`, {
      method: 'POST',
    });
  }

  // Like/unlike post
  async toggleLike(postId: string): Promise<{ liked: boolean; likes: number }> {
    return this.fetchAPI(`/blog/posts/${postId}/like`, {
      method: 'POST',
    });
  }

  // Search blog posts
  async searchPosts(query: string, limit: number = 10): Promise<BlogPost[]> {
    return this.fetchAPI(`/blog/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  }
}

export const blogService = new BlogService();
export default blogService;
