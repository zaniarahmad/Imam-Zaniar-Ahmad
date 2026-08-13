import Image from 'next/image';
import Link from 'next/link';

import Icon from '../components/ui-icon';
import { buildBreadcrumbJsonLd, buildMetadata } from '../../lib/metadata';
import { siteContent } from '../../lib/site-content';

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', item: siteContent.siteUrl },
  { name: 'Lectures', item: `${siteContent.siteUrl}/lectures` },
]);

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${siteContent.siteUrl}/lectures#lecture-service`,
      name: 'Islamic lectures, khutbahs, workshops, and community talks',
      serviceType: 'Islamic lectures, conference speaking, and community talks',
      url: `${siteContent.siteUrl}/lectures`,
      provider: { '@id': `${siteContent.siteUrl}/#person` },
      areaServed: 'Ontario, Canada',
      audience: 'Mosques, schools, universities, conferences, charities, and Muslim communities',
    },
    {
      '@type': 'Service',
      '@id': `${siteContent.siteUrl}/lectures#fundraising-service`,
      name: 'Islamic fundraising support for mosques and charities',
      serviceType: 'Mosque, charity, and community fundraising appeals',
      url: `${siteContent.siteUrl}/lectures#fundraising`,
      provider: { '@id': `${siteContent.siteUrl}/#person` },
      areaServed: 'Ontario, Canada',
      audience: 'Mosques, Islamic schools, charities, and nonprofit organizations',
    },
    {
      '@type': 'Service',
      '@id': `${siteContent.siteUrl}/lectures#media-service`,
      name: 'Islamic media interviews, podcast appearances, and webinars',
      serviceType: 'Media and podcast appearances',
      url: `${siteContent.siteUrl}/lectures#media-appearances`,
      provider: { '@id': `${siteContent.siteUrl}/#person` },
      areaServed: 'Canada and online',
      audience: 'Podcasts, media platforms, webinars, and online communities',
    },
    {
      '@type': 'Service',
      '@id': `${siteContent.siteUrl}/lectures#technology-service`,
      name: 'Technology, AI, Islamic fintech, and innovation talks',
      serviceType: 'Technology and innovation speaking',
      url: `${siteContent.siteUrl}/lectures#technology-talks`,
      provider: { '@id': `${siteContent.siteUrl}/#person` },
      areaServed: 'Canada and online',
      audience: 'Conferences, universities, startups, charities, and Muslim organizations',
    },
  ],
};

const speakingServices = [
  {
    href: '#lectures',
    icon: 'microphone',
    title: 'Islamic Lectures',
    description:
      'Inspiring talks for masjids, schools, universities, and community events.',
  },
  {
    href: '#conference-speaking',
    icon: 'podium',
    title: 'Conference Speaking',
    description:
      'Keynote presentations and sessions for Islamic conferences.',
  },
  {
    href: '#fundraising',
    icon: 'gift',
    title: 'Fundraising Events',
    description:
      'Charity fundraising dinners, appeals, and campaign launches.',
  },
  {
    href: '#media-appearances',
    icon: 'headphones',
    title: 'Media and Podcast Appearances',
    description:
      'Guest interviews, podcasts, webinars, and online discussions.',
  },
  {
    href: '#technology-talks',
    icon: 'technology',
    title: 'Technology and Innovation Talks',
    description:
      'Technology, AI, digital products, Islamic fintech, Zakah, charitable innovation, and impactful startups in the Islamic space.',
  },
];

const specialEngagements = [
  {
    id: 'conference-speaking',
    icon: 'podium',
    label: 'On Stage',
    title: 'Conference Speaking',
    description:
      'Keynotes and conference sessions shaped around the audience, event theme, and practical takeaway.',
  },
  {
    id: 'media-appearances',
    icon: 'headphones',
    label: 'On Air',
    title: 'Media and Podcast Appearances',
    description:
      'Thoughtful guest interviews, webinars, podcasts, and online conversations for broad audiences.',
  },
  {
    id: 'technology-talks',
    icon: 'technology',
    label: 'Forward Looking',
    title: 'Technology and Innovation Talks',
    description:
      'Insight at the intersection of faith, AI, entrepreneurship, Islamic fintech, Zakah, and charitable innovation.',
  },
];

const fundraisingServices = [
  {
    icon: 'mosque',
    title: 'Mosque Fundraising',
    description:
      'Fundraising support for mosque expansion, renovations, programming, operations, and community projects.',
  },
  {
    icon: 'heart',
    title: 'Charity Appeals',
    description:
      'Clear, values-led appeals for Islamic charities, humanitarian campaigns, and nonprofit initiatives.',
  },
  {
    icon: 'school',
    title: 'Schools and Youth Programs',
    description:
      'Community fundraising for Islamic schools, student programs, education, and youth development.',
  },
  {
    icon: 'gift',
    title: 'Ramadan and Special Campaigns',
    description:
      'Fundraising talks and donor appeals for Ramadan, community dinners, galas, and focused campaigns.',
  },
];

export const metadata = buildMetadata({
  title: 'Islamic Lectures, Conference Speaking, Media and Fundraising',
  description:
    'Invite Imam Zaniar Ahmad for Islamic lectures, conference keynotes, podcasts, technology talks, mosque fundraising, and Muslim community events.',
  path: '/lectures',
});

export default function LecturesPage() {
  return (
    <div className="page-shell lectures-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <section className="page-hero page-hero--with-media lectures-page__hero">
        <div className="page-hero__copy">
          <span className="eyebrow">Lectures, Media, Technology, and Fundraising</span>
          <h1>Islamic Lectures and Speaking for Communities</h1>
          <p className="section-lead">
            Invite Imam Zaniar Ahmad for a khutbah, keynote, podcast, technology
            talk, workshop, or fundraising appeal for a mosque, school,
            conference, charity, or Muslim organization.
          </p>
          <div className="content-actions">
            <a className="button button--primary" href={siteContent.contact.phoneHref}>
              Call for Availability
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
        <figure className="page-hero__media page-hero__media--portrait lectures-page__portrait">
          <Image
            src={siteContent.photos.outdoorLecture}
            alt="Imam Zaniar Ahmad delivering an outdoor Islamic talk"
            width={1365}
            height={2048}
            priority
            sizes="(max-width: 820px) 92vw, 38vw"
          />
          <figcaption>Available for in-person, virtual, and hybrid events.</figcaption>
        </figure>
      </section>

      <section className="speaking-service-index" aria-labelledby="speaking-services-title">
        <div className="speaking-service-index__intro">
          <span className="eyebrow eyebrow--light">Ways to Invite Imam Zaniar</span>
          <h2 id="speaking-services-title">Speaking for Every Kind of Gathering</h2>
          <p>
            Select a format to see how a lecture, keynote, media appearance,
            technology talk, or fundraising engagement can serve your audience.
          </p>
        </div>
        <nav className="speaking-service-index__grid" aria-label="Speaking services">
          {speakingServices.map((service, index) => (
            <a href={service.href} key={service.title}>
              <span className="speaking-service-index__topline">
                <span className="speaking-service-index__icon"><Icon name={service.icon} /></span>
                <small>0{index + 1}</small>
              </span>
              <strong>{service.title}</strong>
              <p>{service.description}</p>
              <span className="speaking-service-index__link">
                Explore <Icon name="arrow" />
              </span>
            </a>
          ))}
        </nav>
      </section>

      <section className="section section--compact booking-process booking-process--first">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Booking Process</span>
            <h2>Three Simple Steps</h2>
          </div>
          <p className="section-lead">
            Lecture and fundraising requests are arranged directly by phone or
            SMS text.
          </p>
        </div>

        <div className="booking-step-grid">
          <article className="card visual-card">
            <span className="card-icon"><Icon name="phone" /></span>
            <h3>1. Call or Send an SMS</h3>
            <p>
              Share the event date, organization, city, and whether you need a
              lecture, keynote, media appearance, technology talk, or
              fundraising appeal.
            </p>
          </article>
          <article className="card visual-card">
            <span className="card-icon"><Icon name="calendar" /></span>
            <h3>2. Confirm the Event Details</h3>
            <p>
              Review the audience, topic, format, timing, fundraising goal, and
              any travel or technology requirements.
            </p>
          </article>
          <article className="card visual-card">
            <span className="card-icon"><Icon name="check" /></span>
            <h3>3. Finalize the Engagement</h3>
            <p>
              Once availability and expectations are clear, the engagement can
              be confirmed and prepared with the organizer.
            </p>
          </article>
        </div>

        <div className="booking-format-strip">
          <span className="card-icon"><Icon name="video" /></span>
          <div>
            <strong>Flexible Event Formats</strong>
            <p>In-person, virtual, and hybrid requests are welcome.</p>
          </div>
        </div>
      </section>

      <section className="section section--compact" id="lectures">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Lectures and Speaking</span>
            <h2>Thoughtful Talks for Communities of Every Size</h2>
          </div>
          <p className="section-lead">
            Topics and formats can be tailored for students, families,
            professionals, congregations, and community organizations.
          </p>
        </div>

        <div className="pill-list">
          {siteContent.speakingAudiences.map((audience) => (
            <span key={audience} className="pill">
              <Icon name="community" />{audience}
            </span>
          ))}
        </div>

        <div className="lecture-topic-grid">
          {siteContent.speakingTopics.map((topic, index) => (
            <article key={topic} className="card card--soft visual-card">
              <span className="card-icon">
                <Icon name={['heart', 'ring', 'school', 'community', 'microphone', 'book', 'technology', 'globe'][index]} />
              </span>
              <p>{topic}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--compact special-engagements">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Special Engagements</span>
            <h2>Insight Beyond the Lecture Hall</h2>
          </div>
          <p className="section-lead">
            Conference, media, and technology conversations can be tailored to
            the theme, platform, and people you want to reach.
          </p>
        </div>
        <div className="special-engagement-grid">
          {specialEngagements.map((engagement) => (
            <article id={engagement.id} key={engagement.title}>
              <span className="special-engagement-grid__icon"><Icon name={engagement.icon} /></span>
              <small>{engagement.label}</small>
              <h3>{engagement.title}</h3>
              <p>{engagement.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="fundraising-section" id="fundraising">
        <div className="fundraising-section__intro">
          <span className="eyebrow eyebrow--light">Fundraising Services</span>
          <h2>Help Your Community Give with Purpose</h2>
          <p>
            Imam Zaniar is available to support Islamic fundraising campaigns
            with a clear appeal grounded in faith, responsibility, and the
            purpose behind the project.
          </p>
          <div className="fundraising-section__formats">
            <span><Icon name="check" />Live fundraising appeals</span>
            <span><Icon name="check" />Campaign talks and donor engagement</span>
            <span><Icon name="check" />In-person, virtual, and hybrid events</span>
          </div>
        </div>

        <div className="fundraising-service-grid">
          {fundraisingServices.map((service) => (
            <article key={service.title}>
              <span className="card-icon"><Icon name={service.icon} /></span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="speaking-cta">
        <div className="speaking-cta__copy">
          <span className="eyebrow eyebrow--light">Direct Booking</span>
          <h2>Book a Speaking or Fundraising Engagement</h2>
          <p>
            Call or send an SMS with the date, location, audience, format, and
            the goal of your program, interview, or campaign.
          </p>
          <div className="content-actions">
            <a className="button button--cream" href={siteContent.contact.phoneHref}>
              Call {siteContent.contact.phoneDisplay}
            </a>
            <a className="button button--outline-light" href={siteContent.contact.smsHref}>
              Send an SMS Text
            </a>
            <Link className="text-link text-link--light" href="/blog/invite-imam-zaniar-to-speak">
              How to invite Imam Zaniar Ahmad to speak <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <p className="phone-channel-note phone-channel-note--light">
            <Icon name="phone" />
            {siteContent.contact.phoneOnlyNote}
          </p>
        </div>
        <figure className="speaking-cta__media">
          <Image
            src={siteContent.photos.portrait}
            alt="Imam Zaniar Ahmad speaking to a community audience"
            width={1206}
            height={1502}
            sizes="(max-width: 820px) 92vw, 34vw"
          />
        </figure>
      </section>

      <section className="closing-cta closing-cta--compact">
        <span className="closing-cta__seal" aria-hidden="true"><Icon name="community" /></span>
        <span className="eyebrow">Community Initiatives</span>
        <h2>Explore More of Imam Zaniar&apos;s Work</h2>
        <p>
          Learn about projects supporting Islamic services, Zakah education,
          and charitable giving.
        </p>
        <Link className="button button--primary" href="/projects">
          View Community Projects
        </Link>
      </section>
    </div>
  );
}
