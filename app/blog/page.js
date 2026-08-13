import Image from 'next/image';
import Link from 'next/link';

import Icon from '../components/ui-icon';
import { buildMetadata } from '../../lib/metadata';
import { siteContent } from '../../lib/site-content';

export const metadata = buildMetadata({
  title: 'Blog and Resources',
  description:
    'Read practical guidance about Nikah preparation, Muslim wedding planning in Ontario, marriage officiation, Islamic talks, and community service.',
  path: '/blog',
});

export default function BlogIndexPage() {
  return (
    <div className="page-shell">
      <section className="page-hero page-hero--with-media blog-hero">
        <div className="page-hero__copy">
          <span className="eyebrow">Blog</span>
          <h1>Practical Guidance for Couples and Communities</h1>
          <p className="section-lead">
            Clear, useful articles about preparing for a Nikah, inviting a speaker,
            and serving Muslim communities with intention.
          </p>
        </div>
        <figure className="page-hero__media page-hero__media--landscape">
          <Image
            src={siteContent.photos.signingNikah}
            alt="Imam Zaniar Ahmad writing notes while preparing for a ceremony"
            width={1365}
            height={2048}
            priority
            sizes="(max-width: 820px) 92vw, 38vw"
          />
          <figcaption>Notes on faith, family, preparation, and service.</figcaption>
        </figure>
      </section>

      <section className="section section--compact">
        <div className="card-grid">
          {siteContent.blogPosts.map((post, index) => (
            <article key={post.slug} className="blog-card">
              <Image
                src={[siteContent.photos.withGroom, siteContent.photos.communityEvent][index]}
                alt={index === 0 ? 'Imam Zaniar Ahmad with a groom at a Nikah' : 'Imam Zaniar Ahmad at a community event'}
                width={index === 0 ? 1206 : 1448}
                height={index === 0 ? 1494 : 1086}
                sizes="(max-width: 820px) 92vw, 44vw"
              />
              <div className="blog-card__copy">
                <p className="card-meta"><Icon name="calendar" />{post.date}</p>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link className="text-link" href={`/blog/${post.slug}`}>
                  {index === 0
                    ? 'Read the Ontario Nikkah preparation guide'
                    : 'Read how to invite Imam Zaniar to speak'}{' '}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted section--compact">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Featured Resource</span>
            <h2>Explore the Free Nikkah Guide</h2>
          </div>
        </div>

        <div className="content-actions">
          <Link className="button button--primary" href="/nikah#guide-preview">
            Explore the Free Guide
          </Link>
          <Link className="button button--ghost" href="/nikah#guide">
            Explore Guide Details
          </Link>
        </div>
      </section>

      <section className="closing-cta closing-cta--compact">
        <span className="closing-cta__seal" aria-hidden="true"><Icon name="message" /></span>
        <span className="eyebrow">Speak with Imam Zaniar</span>
        <h2>Ready to Discuss a Nikah or Community Event?</h2>
        <p>
          Choose the correct contact method for Nikah bookings, lectures,
          fundraising engagements, or general questions.
        </p>
        <div className="content-actions content-actions--center">
          <Link className="button button--primary" href="/contact">
            Contact Imam Zaniar
          </Link>
        </div>
      </section>
    </div>
  );
}
