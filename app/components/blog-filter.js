'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const dateFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export default function BlogFilter({ posts }) {
  const categories = useMemo(
    () => ['All', ...new Set(posts.map((post) => post.category))],
    [posts],
  );
  const [activeCategory, setActiveCategory] = useState('All');
  const visiblePosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="blog-browser">
      <div className="blog-browser__toolbar">
        <p className="blog-browser__label">Browse by topic</p>
        <div className="blog-filter" aria-label="Filter articles by category">
          {categories.map((category) => (
            <button
              className="blog-filter__button"
              type="button"
              key={category}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visiblePosts.length} {visiblePosts.length === 1 ? 'article' : 'articles'}
        {activeCategory === 'All' ? '' : ` in ${activeCategory}`}.
      </p>

      <div className="card-grid blog-grid">
        {visiblePosts.map((post) => (
          <article key={post.slug} className="blog-card">
            <Image
              src={post.coverImage}
              alt={post.coverAlt}
              width={post.coverWidth}
              height={post.coverHeight}
              sizes="(max-width: 820px) 92vw, 44vw"
            />
            <div className="blog-card__copy">
              <div className="blog-card__topline">
                <span className="blog-card__category">{post.category}</span>
                <span className="blog-card__read-time">{post.readTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="blog-card__footer">
                <Link className="text-link" href={`/blog/${post.slug}`}>
                  Read article <span aria-hidden="true">&rarr;</span>
                </Link>
                <time dateTime={post.date} className="blog-card__date">
                  {dateFormatter.format(new Date(post.date))}
                </time>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
