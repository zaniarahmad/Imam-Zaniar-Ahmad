import Image from 'next/image';
import Link from 'next/link';

import Icon from '../components/ui-icon';
import { buildBreadcrumbJsonLd, buildMetadata } from '../../lib/metadata';
import { siteContent } from '../../lib/site-content';

const workshops = [
  {
    title: 'Zakah Workshop',
    label: 'Most Popular',
    icon: 'gift',
    featured: true,
    description:
      'A practical, accessible workshop that helps participants understand who pays Zakah, which assets are included, how calculations work, and how to approach common questions with confidence.',
    audiences: 'Masajid, organizations, universities, professionals, and community groups',
  },
  {
    title: 'Money Mastery Finance Course for Adults',
    icon: 'layers',
    description:
      'A practical course that helps adults think more clearly about budgeting, saving, debt, responsible financial choices, and long-term goals through an Islamic lens.',
    audiences: 'Adults, professionals, families, and community groups',
  },
  {
    title: 'Money Master for Kids',
    icon: 'school',
    description:
      'An age-appropriate introduction to earning, saving, spending, giving, and making responsible money choices with confidence and good values.',
    audiences: 'Islamic schools, weekend schools, youth groups, and family programs',
  },
  {
    title: 'Marriage Workshop',
    icon: 'ring',
    description:
      'A faith-centred workshop about preparing for marriage, communication, expectations, mutual care, and building a healthy foundation together.',
    audiences: 'Young adults, singles, engaged couples, families, and community groups',
  },
  {
    title: 'Dua Workshop',
    icon: 'heart',
    description:
      'A reflective and practical workshop about the meaning of dua, its etiquette, approaching Allah with sincerity, and making dua part of everyday life.',
    audiences: 'Youth, adults, families, schools, and masjid communities',
  },
];

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', item: siteContent.siteUrl },
  { name: 'Workshops', item: `${siteContent.siteUrl}/workshops` },
]);

const workshopServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteContent.siteUrl}/workshops#service`,
  name: 'Islamic Workshops for Masajid and Organizations',
  serviceType: 'Islamic educational workshops and community courses',
  url: `${siteContent.siteUrl}/workshops`,
  provider: { '@id': `${siteContent.siteUrl}/#person` },
  areaServed: 'Ontario, Canada and online',
  audience: 'Masajid, Islamic schools, universities, charities, nonprofits, and Muslim community organizations',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Workshop Topics',
    itemListElement: workshops.map((workshop) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: workshop.title,
        description: workshop.description,
      },
    })),
  },
};

export const metadata = buildMetadata({
  title: 'Islamic Workshops for Masajid and Organizations',
  description:
    'Invite Imam Zaniar Ahmad for Zakah, Islamic finance, kids money, marriage, and dua workshops for masajid, schools, universities, and organizations.',
  path: '/workshops',
});

export default function WorkshopsPage() {
  return (
    <div className="page-shell workshops-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workshopServiceJsonLd) }}
      />

      <section className="page-hero page-hero--with-media workshops-hero">
        <div className="page-hero__copy">
          <span className="eyebrow">For Masajid and Organizations</span>
          <h1>Practical Islamic Workshops for Your Community</h1>
          <p className="section-lead">
            Invite Imam Zaniar Ahmad for an engaging workshop on Zakah, money,
            marriage, or dua—designed around the needs and age group of your audience.
          </p>
          <div className="content-actions">
            <a className="button button--primary" href={siteContent.contact.phoneHref}>
              Call to Request a Workshop
            </a>
            <a className="button button--ghost" href={siteContent.contact.smsHref}>
              Send an SMS Text
            </a>
          </div>
          <p className="phone-channel-note">
            <Icon name="phone" />
            {siteContent.contact.phoneOnlyNote}
          </p>
        </div>
        <figure className="page-hero__media page-hero__media--portrait workshops-hero__media">
          <Image
            src={siteContent.photos.outdoorLecture}
            alt="Imam Zaniar Ahmad delivering an Islamic workshop for a community audience"
            width={1365}
            height={2048}
            priority
            sizes="(max-width: 820px) 92vw, 38vw"
          />
          <figcaption>Available for in-person, virtual, and hybrid programs.</figcaption>
        </figure>
      </section>

      <section className="section section--compact workshop-catalog" aria-labelledby="workshop-catalog-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Workshop Topics</span>
            <h2 id="workshop-catalog-title">Choose a Program for Your Audience</h2>
          </div>
          <p className="section-lead">
            Each program can be discussed with the organizer to suit the audience,
            available time, setting, and goals of the event.
          </p>
        </div>

        <div className="workshop-grid">
          {workshops.map((workshop) => (
            <article
              className={`workshop-card${workshop.featured ? ' workshop-card--featured' : ''}`}
              key={workshop.title}
            >
              <div className="workshop-card__topline">
                <span className="card-icon"><Icon name={workshop.icon} /></span>
                {workshop.label ? <span className="workshop-card__badge">{workshop.label}</span> : null}
              </div>
              {workshop.featured ? (
                <Image
                  className="workshop-card__zakah-logo"
                  src="/images/projects/zakah-horizontal-logo.png"
                  alt="Zakah.com"
                  width={555}
                  height={183}
                  sizes="220px"
                />
              ) : null}
              <h3>{workshop.title}</h3>
              <p>{workshop.description}</p>
              <div className="workshop-card__audience">
                <strong>Designed for</strong>
                <span>{workshop.audiences}</span>
              </div>
              <a className="text-link" href={siteContent.contact.smsHref}>
                Request this workshop <span aria-hidden="true">&rarr;</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="workshop-zakah-feature">
        <div className="workshop-zakah-feature__copy">
          <span className="eyebrow eyebrow--light">Zakah Education</span>
          <h2>Practical Guidance from the Co-Founder of Zakah.com</h2>
          <p>
            Imam Zaniar Ahmad is a co-founder of Zakah.com, a practical Zakah
            calculator built to make Zakah easier to understand and calculate.
            The Zakah Workshop brings that focus on clarity into a live learning
            experience for your community.
          </p>
          <a
            className="button button--cream"
            href="https://zakah.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Zakah.com
          </a>
        </div>
        <div className="workshop-zakah-feature__mark">
          <Image
            src="/images/projects/zakah-logo.webp"
            alt="Zakah.com logo"
            width={1200}
            height={1200}
            sizes="(max-width: 720px) 45vw, 240px"
          />
        </div>
      </section>

      <section className="section section--compact booking-process">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Request a Workshop</span>
            <h2>What to Include in Your Request</h2>
          </div>
          <p className="section-lead">
            A few clear details make it easier to confirm availability and shape
            the right program for your community.
          </p>
        </div>
        <div className="booking-step-grid">
          <article className="card visual-card">
            <span className="card-icon"><Icon name="calendar" /></span>
            <h3>Date and Location</h3>
            <p>Share your preferred date, city, venue, and whether the program is in person, virtual, or hybrid.</p>
          </article>
          <article className="card visual-card">
            <span className="card-icon"><Icon name="community" /></span>
            <h3>Audience and Format</h3>
            <p>Include the age group, expected attendance, workshop length, and whether you would like a question period.</p>
          </article>
          <article className="card visual-card">
            <span className="card-icon"><Icon name="message" /></span>
            <h3>Goals and Context</h3>
            <p>Tell us which workshop you want and what you hope participants will understand or take away.</p>
          </article>
        </div>
      </section>

      <section className="speaking-cta workshop-booking-cta">
        <div className="speaking-cta__copy">
          <span className="eyebrow eyebrow--light">Workshop Booking</span>
          <h2>Bring a Practical Workshop to Your Community</h2>
          <p>
            Call or send a regular SMS with the workshop name, organization,
            audience, date, city, and preferred format.
          </p>
          <div className="content-actions">
            <a className="button button--cream" href={siteContent.contact.phoneHref}>
              Call {siteContent.contact.phoneDisplay}
            </a>
            <a className="button button--outline-light" href={siteContent.contact.smsHref}>
              Send an SMS Text
            </a>
          </div>
        </div>
        <div className="speaking-cta__media workshop-booking-cta__icon" aria-hidden="true">
          <Icon name="book" />
        </div>
      </section>

      <section className="closing-cta closing-cta--compact">
        <span className="eyebrow">Other Invitations</span>
        <h2>Looking for a Lecture, Keynote, or Fundraising Appeal?</h2>
        <p>Explore Imam Zaniar&apos;s other speaking and community services.</p>
        <Link className="button button--primary" href="/lectures">
          View Speaking Services
        </Link>
      </section>
    </div>
  );
}
