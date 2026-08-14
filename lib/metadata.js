import { siteContent } from './site-content';

export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
}) {
  const shouldNoIndex = noIndex || process.env.VERCEL_ENV === 'preview';
  const canonical = path ? `${siteContent.siteUrl}${path}` : siteContent.siteUrl;
  const pageTitle = title ? `${title} | ${siteContent.name}` : siteContent.name;

  return {
    title: title || undefined,
    description,
    alternates: path ? { canonical } : undefined,
    robots: shouldNoIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName: siteContent.name,
      type: 'website',
      images: [
        {
          url: `${siteContent.siteUrl}/og-image.svg`,
          width: 1200,
          height: 630,
          alt: siteContent.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [`${siteContent.siteUrl}/og-image.svg`],
    },
  };
}

export function buildBreadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}
