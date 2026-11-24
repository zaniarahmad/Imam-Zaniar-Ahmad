import { siteContent } from '../lib/site-content';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/book-unsubscribe'],
      },
      ...[
        'Googlebot',
        'Bingbot',
        'OAI-SearchBot',
        'ChatGPT-User',
        'GPTBot',
        'Claude-SearchBot',
        'Claude-User',
        'ClaudeBot',
      ].map((userAgent) => ({ userAgent, allow: '/', disallow: ['/admin/', '/api/', '/book-unsubscribe'] })),
    ],
    sitemap: `${siteContent.siteUrl}/sitemap.xml`,
    host: siteContent.siteUrl,
  };
}
