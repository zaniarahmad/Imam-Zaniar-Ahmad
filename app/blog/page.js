import Link from 'next/link';

import BlogFilter from '../components/blog-filter';
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
      <section className="blog-masthead">
        <span className="blog-masthead__line" aria-hidden="true" />
        <h1>Blog</h1>
      </section>

      <section className="section blog-index-section">
        <BlogFilter posts={siteContent.blogPosts} />
      </section>

      <section className="section section--muted section--compact">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Featured Resource</span>
            <h2>Explore The Simple Nikkah Guide</h2>
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
