import { siteContent } from '../lib/site-content';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
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
      ].map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${siteContent.siteUrl}/sitemap.xml`,
    host: siteContent.siteUrl,
  };
}
