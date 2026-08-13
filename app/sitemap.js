import { siteContent } from '../lib/site-content';

export default function sitemap() {
  const routes = [
    { path: '/', lastModified: '2026-08-13' },
    { path: '/about', lastModified: '2026-07-27' },
    { path: '/nikah', lastModified: '2026-08-13' },
    { path: '/lectures', lastModified: '2026-08-13' },
    { path: '/testimonials', lastModified: '2026-07-27' },
    { path: '/projects', lastModified: '2026-07-27' },
    { path: '/blog', lastModified: '2026-08-13' },
    { path: '/contact', lastModified: '2026-08-13' },
    { path: '/privacy', lastModified: '2026-07-27' },
    { path: '/accessibility', lastModified: '2026-07-27' },
  ];

  const staticUrls = routes.map((route) => ({
    url: `${siteContent.siteUrl}${route.path}`,
    lastModified: new Date(route.lastModified),
  }));

  const blogUrls = siteContent.blogPosts.map((post) => ({
    url: `${siteContent.siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated || post.date),
  }));

  return [...staticUrls, ...blogUrls];
}
