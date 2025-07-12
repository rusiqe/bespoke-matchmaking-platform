import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { BlogPost, BlogFilters } from '../types/blog';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<BlogFilters>({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await blogService.getBlogPosts(filters);
        setPosts(response.posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="mb-6">
              <h2 className="text-2xl font-semibold">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-gray-600">{post.excerpt}</p>
              <div className="text-sm text-gray-500">
                <span>{post.publishedAt}</span> | <span>{post.readingTime} min read</span>
              </div>
            </div>
          ))}
          {posts.length === 0 && <p>No posts found.</p>}
        </div>
      )}
    </div>
  );
};

export default BlogList;

