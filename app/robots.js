import { siteContent } from '../lib/site-content';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${siteContent.siteUrl}/sitemap.xml`,
    host: siteContent.siteUrl,
  };
}
