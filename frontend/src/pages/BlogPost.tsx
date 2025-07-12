import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { blogService } from '../services/blogService';
import { BlogPost as BlogPostType, RelatedPost } from '../types/blog';
import { formatDate } from '../utils/dateUtils';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const postData = await blogService.getBlogPost(slug);
        setPost(postData);
        
        // Increment views
        await blogService.incrementViews(postData.id);
        
        // Fetch related posts
        const related = await blogService.getRelatedPosts(postData.id);
        setRelatedPosts(related);
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link 
            to="/blog" 
            className="inline-block bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage,
    "author": {
      "@type": "Person",
      "name": post.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bespoke Matchmaking",
      "logo": {
        "@type": "ImageObject",
        "url": "/logo.png"
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.seo.metaTitle || post.title}</title>
        <meta name="description" content={post.seo.metaDescription || post.excerpt} />
        <meta name="keywords" content={post.seo.metaKeywords.join(', ')} />
        <meta name="author" content={post.author.name} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.seo.ogDescription || post.title} />
        <meta property="og:description" content={post.seo.ogDescription || post.excerpt} />
        <meta property="og:image" content={post.seo.ogImage || post.featuredImage} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.featuredImage} />
        
        {/* Canonical URL */}
        {post.seo.canonicalUrl && <link rel="canonical" href={post.seo.canonicalUrl} />}
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-teal-50">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-rose-600 to-teal-600 overflow-hidden">
          {post.featuredImage && (
            <div className="absolute inset-0">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-full object-cover opacity-30"
              />
            </div>
          )}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                  <span className="text-white font-medium">{post.category}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>
                <p className="text-xl text-white opacity-90 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center space-x-6 text-white">
                  <div className="flex items-center space-x-2">
                    {post.author.avatar && (
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <span className="font-medium">{post.author.name}</span>
                  </div>
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>{post.readingTime} min read</span>
                  <span>{post.views} views</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {relatedPost.featuredImage && (
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <div className="text-sm text-rose-600 font-medium mb-2">
                          {relatedPost.category}
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{formatDate(relatedPost.publishedAt)}</span>
                          <span>{relatedPost.readingTime} min read</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
