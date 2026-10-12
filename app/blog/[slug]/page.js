import { readFileSync } from 'node:fs';
import path from 'node:path';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ReadingProgress from '../../components/reading-progress';
import Icon from '../../components/ui-icon';
import { parseArticleMarkdown } from '../../../lib/blog-markdown';
import { buildMetadata } from '../../../lib/metadata';
import { siteContent } from '../../../lib/site-content';

export function generateStaticParams() {
  return siteContent.blogPosts.map((post) => ({ slug: post.slug }));
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
}

export function generateMetadata({ params }) {
  const post = siteContent.blogPosts.find((entry) => entry.slug === params.slug);

  if (!post) {
    return buildMetadata({
      title: 'Article not found',
      description: 'The requested article could not be found.',
      path: `/blog/${params.slug}`,
      noIndex: true,
    });
  }

  const metadata = buildMetadata({
    title: post.seoTitle || post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    absoluteTitle: Boolean(post.seoTitle),
  });
  const coverUrl = `${siteContent.siteUrl}${post.coverImage}`;

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      title: post.seoTitle || post.title,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author || siteContent.name],
      images: [{ url: coverUrl, width: post.coverWidth, height: post.coverHeight, alt: post.coverAlt }],
    },
    twitter: {
      ...metadata.twitter,
      title: post.seoTitle || post.title,
      images: [coverUrl],
    },
  };
}

function renderInline(text) {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*|imamzaniarahmad\.com)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>;
      }
      if (part === 'imamzaniarahmad.com') {
        return <Link key={`${part}-${index}`} href="/">imamzaniarahmad.com</Link>;
      }
      return part;
    });
}

function ArticleBlock({ block }) {
  if (block.type === 'heading') {
    const Heading = block.level === 3 ? 'h3' : 'h2';
    return <Heading id={block.id}>{renderInline(block.text)}</Heading>;
  }

  if (block.type === 'question') {
    return <h3 className="editorial-article__question">{renderInline(block.text)}</h3>;
  }

  if (block.type === 'quote') {
    return (
      <blockquote className="editorial-article__quote">
        {block.lines.filter(Boolean).map((line, index) => {
          const isArabic = /[\u0600-\u06ff]/.test(line);
          return (
            <p key={`${line}-${index}`} dir={isArabic ? 'rtl' : undefined} lang={isArabic ? 'ar' : undefined}>
              {renderInline(line)}
            </p>
          );
        })}
      </blockquote>
    );
  }

  if (block.type === 'ordered-list') {
    return (
      <ol className="editorial-article__sources">
        {block.items.map((item) => <li key={item}>{renderInline(item)}</li>)}
      </ol>
    );
  }

  return <p>{renderInline(block.text)}</p>;
}

function RichArticle({ post }) {
  const markdownPath = path.join(process.cwd(), 'content', 'blog', `${post.slug}.md`);
  const blocks = parseArticleMarkdown(readFileSync(markdownPath, 'utf8'));
  const contents = blocks.filter((block) => block.type === 'heading' && block.level === 2);
  const articleUrl = `${siteContent.siteUrl}/blog/${post.slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: articleUrl,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    image: `${siteContent.siteUrl}${post.coverImage}`,
    articleSection: post.category,
    wordCount: post.wordCount,
    timeRequired: `PT${Number.parseInt(post.readTime, 10)}M`,
    author: { '@id': `${siteContent.siteUrl}/#person` },
    publisher: { '@id': `${siteContent.siteUrl}/#person` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="editorial-article">
        <header className="editorial-article__header">
          <nav className="editorial-article__breadcrumb" aria-label="Breadcrumb">
            <Link href="/blog">Blog</Link><span aria-hidden="true">/</span><span>{post.category}</span>
          </nav>
          <span className="eyebrow">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="editorial-article__deck">{post.excerpt}</p>
          <div className="editorial-article__byline">
            <Image src={siteContent.photos.portrait} alt="Imam Zaniar Ahmad" width={1206} height={1502} sizes="52px" priority />
            <div>
              <strong>{post.author}</strong>
              <span>Islamic speaker and registered Ontario marriage officiant</span>
            </div>
            <div className="editorial-article__meta">
              <span><Icon name="calendar" /> {formatDate(post.date)}</span>
              <span><Icon name="clock" /> {post.readTime}</span>
            </div>
          </div>
        </header>

        <figure className="editorial-article__cover">
          <Image src={post.coverImage} alt={post.coverAlt} width={post.coverWidth} height={post.coverHeight} priority sizes="(max-width: 820px) 94vw, 1180px" />
          <figcaption>{post.coverCaption}</figcaption>
        </figure>

        <div className="editorial-article__layout">
          <div className="editorial-article__body prose">
            {blocks.map((block, index) => (
              <ArticleBlock block={block} key={`${block.type}-${block.id || block.text || index}-${index}`} />
            ))}

            <footer className="editorial-author-card">
              <Image src={siteContent.photos.portrait} alt="Imam Zaniar Ahmad" width={1206} height={1502} sizes="92px" />
              <div>
                <span className="card-meta">Written by</span>
                <h2>Imam Zaniar Ahmad</h2>
                <p>Islamic speaker, Nikah officiant, and community educator serving couples and organizations across Ontario.</p>
                <Link className="text-link" href="/about">Learn more about Imam Zaniar <span aria-hidden="true">&rarr;</span></Link>
              </div>
            </footer>
          </div>

          <aside className="editorial-article__aside" aria-label="Article navigation">
            <div className="editorial-article__toc">
              <span className="card-meta">In this article</span>
              <ol>
                {contents.map((item) => (
                  <li key={item.id}><a href={`#${item.id}`}>{item.text}</a></li>
                ))}
              </ol>
            </div>
            <div className="editorial-article__cta">
              <span className="card-icon"><Icon name="book" /></span>
              <h2>Preparing for Your Nikah?</h2>
              <p>Use the free Simple Nikkah Guide or contact Imam Zaniar to discuss your ceremony.</p>
              <Link className="button button--primary" href="/nikah#guide-preview">Get the Free Guide</Link>
              <Link className="text-link" href="/contact">Book a Nikah <span aria-hidden="true">&rarr;</span></Link>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}

function LegacyArticle({ post }) {
  const articleUrl = `${siteContent.siteUrl}/blog/${post.slug}`;
  const isNikahArticle = post.slug === 'prepare-for-a-nikah-in-ontario';
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: articleUrl,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    image: `${siteContent.siteUrl}${post.coverImage}`,
    author: { '@id': `${siteContent.siteUrl}/#person` },
    publisher: { '@id': `${siteContent.siteUrl}/#person` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="page-hero page-hero--with-media article-hero">
        <div className="page-hero__copy">
          <span className="eyebrow">Blog Post</span>
          <h1>{post.title}</h1>
          <p className="section-lead">{post.excerpt}</p>
          <p className="small-copy"><Icon name="calendar" />Published {formatDate(post.date)} · {post.readTime}</p>
        </div>
        <figure className="page-hero__media page-hero__media--landscape">
          <Image src={post.coverImage} alt={post.coverAlt} width={post.coverWidth} height={post.coverHeight} priority sizes="(max-width: 820px) 92vw, 38vw" />
        </figure>
      </section>

      <section className="article-layout">
        <div className="article-sections prose">
          {post.sections.map((section, index) => (
            <div className="article-section" key={section.heading}>
              <span className="article-section__number">0{index + 1}</span>
              <div><h2>{section.heading}</h2><p>{section.body}</p></div>
            </div>
          ))}
        </div>
        <aside className="article-aside">
          <span className="card-icon"><Icon name={isNikahArticle ? 'book' : 'microphone'} /></span>
          <h2>{isNikahArticle ? 'Plan Your Nikah with Confidence' : 'Planning a Community Event?'}</h2>
          <p>{isNikahArticle ? 'Use the complimentary Ontario Nikkah Guide alongside this article.' : 'Share your audience, date, venue, and topic to request a speaking engagement.'}</p>
          <Link className="button button--primary" href={isNikahArticle ? '/nikah#guide' : '/lectures'}>
            {isNikahArticle ? 'Explore the Free Guide' : 'Explore Lectures and Fundraising'}
          </Link>
          <Link className="text-link" href="/contact">
            {isNikahArticle ? 'Book Imam Zaniar for your Nikah' : 'Call or text to book a lecture or fundraising event'} <span aria-hidden="true">&rarr;</span>
          </Link>
        </aside>
      </section>
    </>
  );
}

export default function BlogArticlePage({ params }) {
  const post = siteContent.blogPosts.find((entry) => entry.slug === params.slug);
  if (!post) notFound();

  return <div className="page-shell">{post.markdown ? <RichArticle post={post} /> : <LegacyArticle post={post} />}</div>;
}
