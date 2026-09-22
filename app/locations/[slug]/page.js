import { notFound } from 'next/navigation';
import Link from 'next/link';

import Icon from '../../components/ui-icon';
import { buildMetadata } from '../../../lib/metadata';
import { siteContent } from '../../../lib/site-content';

export function generateStaticParams() {
  return siteContent.locationPages.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }) {
  const location = siteContent.locationPages.find(({ slug }) => slug === params.slug);

  if (!location) {
    return buildMetadata({ title: 'Service Area Not Found', path: '/locations' });
  }

  return buildMetadata({
    title: location.title,
    description: location.description,
    path: `/locations/${location.slug}`,
  });
}

export default function LocationPage({ params }) {
  const location = siteContent.locationPages.find(({ slug }) => slug === params.slug);

  if (!location) notFound();

  const pageUrl = `${siteContent.siteUrl}/locations/${location.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteContent.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${siteContent.siteUrl}/locations` },
          { '@type': 'ListItem', position: 3, name: location.region, item: pageUrl },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: location.title,
        description: location.description,
        url: pageUrl,
        provider: { '@id': `${siteContent.siteUrl}/#person` },
        serviceType: 'Religious Nikah and Ontario marriage officiation',
        areaServed: location.areas.map((name) => ({ '@type': 'City', name })),
      },
    ],
  };

  return (
    <div className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="page-hero">
        <span className="eyebrow">{location.region}</span>
        <h1>{location.title}</h1>
        <p className="section-lead">{location.intro}</p>
        <div className="content-actions">
          <Link className="button button--primary" href="/contact">
            Request Your Nikah Date
          </Link>
          <Link className="button button--ghost" href="/nikah">
            View Nikah Options
          </Link>
        </div>
      </section>

      <section className="section section--compact">
        <div className="section-heading section-heading--editorial">
          <div>
            <span className="eyebrow">Services</span>
            <h2>Choose the Ceremony You Need</h2>
          </div>
          <p className="section-lead">
            Book a religious Nikah (katb kitab), Ontario legal marriage
            officiation, or both services together.
          </p>
        </div>
        <div className="card-grid card-grid--three">
          <article className="service-card">
            <h3>Religious Nikah</h3>
            <p>An Islamic marriage ceremony centred on consent, wali, mahr, and witnesses.</p>
          </article>
          <article className="service-card">
            <h3>Legal Officiation</h3>
            <p>Ontario marriage officiation for couples with the required licence and identification.</p>
          </article>
          <article className="service-card">
            <h3>Both Together</h3>
            <p>The religious ceremony and legal signing coordinated at the same occasion.</p>
          </article>
        </div>
      </section>

      <section className="section section--muted section--compact">
        <div className="section-heading section-heading--editorial">
          <div>
            <span className="eyebrow">Local Planning</span>
            <h2>{location.planningTitle}</h2>
          </div>
        </div>
        <div className="about-hero__bio">
          {location.planningCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="location-list" aria-label={`Communities served near ${location.region}`}>
          {location.areas.map((area) => <span key={area}>{area}</span>)}
        </div>
      </section>

      <section className="section section--compact">
        <div className="section-heading section-heading--editorial">
          <div>
            <span className="eyebrow">Helpful Next Steps</span>
            <h2>Prepare Before You Book</h2>
          </div>
        </div>
        <div className="content-actions">
          <Link className="text-link" href="/blog/prepare-for-a-nikah-in-ontario">
            Read the Ontario Nikkah preparation guide <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link className="text-link" href="/testimonials">
            Read Nikah reviews and testimonials <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link className="text-link" href="/locations">
            View all service areas <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <section className="closing-cta closing-cta--compact">
        <span className="closing-cta__seal" aria-hidden="true"><Icon name="ring" /></span>
        <span className="eyebrow">Check Availability</span>
        <h2>Planning a Nikah in {location.region}?</h2>
        <p>Send the date, venue, and service you need to begin your booking request.</p>
        <div className="content-actions content-actions--center">
          <Link className="button button--primary" href="/contact">Contact Imam Zaniar</Link>
        </div>
      </section>
    </div>
  );
}
