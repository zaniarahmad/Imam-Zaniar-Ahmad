import './globals.css';

import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { Manrope } from 'next/font/google';
import ActiveNavLink from './components/active-nav-link';
import { siteContent, sitePathLinks } from '../lib/site-content';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const primaryLinks = [
  { href: '/nikah', label: 'Nikah' },
  { href: '/lectures', label: 'Lectures' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blog' },
];

export const metadata = {
  metadataBase: new URL(siteContent.siteUrl),
  title: {
    default: siteContent.name,
    template: `%s | ${siteContent.name}`,
  },
  description: siteContent.shortDescription,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION || undefined,
    other: {
      'msvalidate.01': process.env.BING_VERIFICATION || undefined,
    },
  },
};

export default function RootLayout({ children }) {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID || 'G-KLS3Q0KPD9';
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteContent.siteUrl}/#person`,
        name: siteContent.name,
        url: siteContent.siteUrl,
        image: `${siteContent.siteUrl}${siteContent.heroImage}`,
        jobTitle: siteContent.title,
        description: siteContent.shortDescription,
        telephone: siteContent.contact.phoneHref.replace('tel:', ''),
        sameAs: [siteContent.contact.instagram, siteContent.contact.linkedin],
        areaServed: siteContent.serviceAreas,
        knowsAbout: [
          'Nikah ceremonies',
          'Nikkah preparation',
          'Ontario marriage officiation',
          'Lectures and khutbahs',
          'Community speaking',
          'Conference speaking',
          'Media and podcast appearances',
          'Technology and AI talks',
          'Islamic fintech and charitable innovation',
          'Mosque fundraising',
          'Islamic charity fundraising',
          'Meezan',
          'Zakah.com',
          'AutoAjr',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteContent.siteUrl}/#website`,
        url: siteContent.siteUrl,
        name: siteContent.name,
        description: siteContent.shortDescription,
        publisher: {
          '@id': `${siteContent.siteUrl}/#organization`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteContent.siteUrl}/#organization`,
        name: siteContent.name,
        url: siteContent.siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteContent.siteUrl}/icon-512.png`,
          width: 512,
          height: 512,
        },
      },
    ],
  };

  return (
    <html lang="en" className={manrope.variable}>
      <body>
        {ga4Id ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(ga4Id)}, { anonymize_ip: true });`}
            </Script>
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header className="site-header">
          <div className="site-header__inner">
            <Link className="brand" href="/" aria-label="Imam Zaniar Ahmad home">
              <Image
                className="brand__mark"
                src="/favicon.svg"
                width={44}
                height={44}
                alt=""
                priority
              />
              <span className="brand__text">
                <strong>Imam Zaniar Ahmad</strong>
              </span>
            </Link>

            <nav className="site-nav site-nav--desktop" aria-label="Primary">
              <ul>
                {primaryLinks.map((link) => (
                  <li key={link.href}>
                    <ActiveNavLink className={link.featured ? 'nav-featured' : undefined} href={link.href}>
                      {link.label}
                    </ActiveNavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="header-actions">
              <Link
                className="button button--primary button--header"
                href="/contact"
              >
                Book a Nikah
              </Link>
              <details className="mobile-nav">
                <summary aria-label="Open navigation">Menu</summary>
                <nav className="mobile-nav__panel" aria-label="Mobile">
                  {sitePathLinks
                    .slice(1)
                    .filter((link) => link.href !== '/contact')
                    .map((link) => (
                    <ActiveNavLink key={link.href} href={link.href}>
                      {link.label}
                    </ActiveNavLink>
                  ))}
                  <Link href="/contact">
                    Book a Nikah
                  </Link>
                  <a href={siteContent.contact.phoneHref}>
                    Call for Lectures or Fundraising
                  </a>
                  <a href={siteContent.contact.smsHref}>Send an SMS Text</a>
                  <a
                    href={siteContent.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    General Questions on Instagram
                  </a>
                </nav>
              </details>
            </div>
          </div>
        </header>

        <main id="main-content" className="site-main">
          {children}
        </main>

        <footer className="site-footer">
          <div className="site-footer__inner">
            <div className="footer-intro">
              <p className="footer-eyebrow">Imam Zaniar Ahmad</p>
              <p className="footer-description">{siteContent.shortDescription}</p>
              <Link className="footer-cta" href="/contact">
                Contact Imam Zaniar <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div>
              <p className="footer-heading">Explore</p>
              <ul className="footer-links">
                {sitePathLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="footer-heading">Contact</p>
              <ul className="footer-links">
                <li>
                  <Link href="/contact">
                    Book a Nikah
                  </Link>
                </li>
                <li>
                  <a href={siteContent.contact.phoneHref}>
                    Call for lectures or fundraising
                  </a>
                </li>
                <li>
                  <a href={siteContent.contact.smsHref}>
                    Send an SMS text
                  </a>
                </li>
                <li>
                  <a
                    href={siteContent.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ask Imam Zaniar Ahmad a general question on Instagram"
                  >
                    General questions on Instagram
                  </a>
                </li>
              </ul>
              <p className="footer-area">{siteContent.contact.phoneOnlyNote}</p>
              <p className="footer-area">
                Serving Toronto, Peel–Halton, Hamilton–Waterloo, Niagara–Brant,
                and nearby Ontario communities.
              </p>
            </div>
          </div>

          <div className="site-footer__fineprint">
            <p>Copyright {new Date().getFullYear()} Imam Zaniar Ahmad. All rights reserved.</p>
            <div>
              <Link href="/privacy">Privacy</Link>
              <Link href="/accessibility">Accessibility</Link>
              <a href="/sitemap.xml">Sitemap</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
