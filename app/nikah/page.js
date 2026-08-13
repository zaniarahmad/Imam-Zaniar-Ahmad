import Image from 'next/image';
import Link from 'next/link';

import Icon from '../components/ui-icon';
import OntarioServiceMap from '../components/ontario-service-map';
import { buildBreadcrumbJsonLd, buildMetadata } from '../../lib/metadata';
import { siteContent } from '../../lib/site-content';

const serviceOptions = [
  {
    icon: 'ring',
    label: 'Religious Service',
    title: 'Religious Nikah',
    description:
      'An Islamic marriage ceremony centred on willing consent, the wali, mahr, witnesses, and a meaningful beginning.',
  },
  {
    icon: 'document',
    label: 'Legal Service',
    title: 'Ontario Legal Officiation',
    description:
      'Legal marriage officiation for couples who have a valid Ontario marriage licence and the required documents.',
  },
  {
    icon: 'layers',
    label: 'Combined Service',
    title: 'Nikah and Legal Officiation',
    description:
      'Both services coordinated for the same occasion so the religious and legal steps are clear from the start.',
  },
];

const religiousFoundations = [
  {
    icon: 'handshake',
    title: 'Free and Willing Consent',
    description:
      'The bride and groom must both willingly agree to the marriage. Consent is the beginning of a valid and meaningful Nikah.',
  },
  {
    icon: 'community',
    title: 'The Bride’s Wali',
    description:
      'The bride is supported by her wali, who may attend in person or online. Any alternate arrangement should be discussed with the Imam in advance.',
  },
  {
    icon: 'gift',
    title: 'An Agreed Mahr',
    description:
      'The couple agrees on a reasonable gift from the groom to the bride, including what it is and when it will be given.',
  },
  {
    icon: 'person',
    title: 'Confirmed Witnesses',
    description:
      'Confirm the required Muslim witnesses and how they will attend before the ceremony day.',
  },
];

const ontarioPath = [
  {
    title: 'Apply for the Licence',
    description:
      'Begin through the Ontario municipality that will issue your marriage licence.',
  },
  {
    title: 'Collect and Check It',
    description:
      'Bring the required identification and confirm every name and detail before leaving.',
  },
  {
    title: 'Align the Ceremony',
    description:
      'Confirm the date, location, wali, mahr, witnesses, and legal service with the officiant.',
  },
  {
    title: 'Bring the Original',
    description:
      'Keep the original marriage licence with your wedding-day documents.',
  },
  {
    title: 'Complete the Ceremony',
    description:
      'The registered officiant completes the legal paperwork after the ceremony.',
  },
  {
    title: 'Provincial Registration',
    description:
      'The officiant sends the completed documents for registration with Ontario.',
  },
  {
    title: 'Order the Certificate',
    description:
      'After registration, the couple can order the official Ontario marriage certificate.',
  },
];

const weddingFile = [
  'Full names of the bride and groom',
  'Wali contact details or authorized representation',
  'The agreed mahr and when it will be given',
  'Names and attendance plans for the Islamic witnesses',
  'Original Ontario marriage licence for legal officiation',
  'Identification or forms requested by the officiant',
];

const faqItems = [
  ...siteContent.weddingFaqs,
  {
    question: 'When Should We Apply for the Marriage Licence?',
    answer:
      'An Ontario marriage licence is generally valid for three months. Plan the application around the wedding date and confirm current requirements with the issuing municipality.',
  },
  {
    question: 'What Should We Confirm Before the Ceremony?',
    answer:
      'Confirm consent, the wali, mahr, witnesses, ceremony format, legal officiation, paperwork, date, location, and arrival time with the Imam.',
  },
];

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', item: siteContent.siteUrl },
  { name: 'Nikah', item: `${siteContent.siteUrl}/nikah` },
]);

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${siteContent.siteUrl}/nikah#service`,
      name: 'Nikah ceremonies and Ontario marriage officiation',
      serviceType: 'Islamic marriage ceremony and Ontario marriage officiation',
      url: `${siteContent.siteUrl}/nikah`,
      provider: { '@id': `${siteContent.siteUrl}/#person` },
      areaServed: siteContent.serviceAreas,
    },
    {
      '@type': 'Article',
      '@id': `${siteContent.siteUrl}/nikah#guide`,
      headline: 'Nikah and Muslim Wedding Planning Guide for Ontario Couples',
      description:
        'A practical guide to Islamic Nikah requirements, Ontario marriage licences, ceremony preparation, and choosing a Muslim wedding officiant.',
      url: `${siteContent.siteUrl}/nikah`,
      dateModified: '2026-07-27',
      author: {
        '@type': 'Person',
        name: siteContent.name,
        url: siteContent.siteUrl,
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
};

export const metadata = buildMetadata({
  title: 'Nikah Imam and Islamic Marriage Officiant in Ontario',
  description:
    'Book Imam Zaniar Ahmad for a religious Nikah, Ontario legal marriage officiation, or both, and use the free Muslim wedding planning guide.',
  path: '/nikah',
});

export default function NikahPage() {
  return (
    <div className="page-shell nikah-money-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      <section className="page-hero nikah-money-page__hero">
        <span className="eyebrow">Nikah Services and Wedding Planning</span>
        <h1>Nikah Imam and Islamic Marriage Officiant in Ontario</h1>
        <p className="section-lead">
          Book a religious Nikah ceremony, Ontario legal marriage officiation,
          or both, then use the free guide to prepare for the ceremony with
          confidence.
        </p>
        <div className="content-actions">
          <Link
            className="button button--primary"
            href="/contact"
          >
            Book a Nikah
          </Link>
          <a className="button button--ghost" href="#guide-preview">
            Read the Free Nikah Guide
          </a>
        </div>
        <p className="nikah-response-note">
          <Icon name="clock" />
          <strong>{siteContent.contact.nikahResponseTime}</strong>
          after submitting the form through the Contact page
        </p>
      </section>

      <nav className="nikah-path-switcher" aria-label="Choose Nikah services or the guide">
        <a href="#services">
          <span className="nikah-path-switcher__icon"><Icon name="ring" /></span>
          <span>
            <small>Book a Ceremony</small>
            <strong>Nikah Services</strong>
            <em>Religious, legal, or both</em>
          </span>
          <Icon name="arrow" />
        </a>
        <a href="#guide-preview">
          <span className="nikah-path-switcher__icon"><Icon name="book" /></span>
          <span>
            <small>Plan with Clarity</small>
            <strong>Free Nikah Guide</strong>
            <em>Read online or download the PDF</em>
          </span>
          <Icon name="arrow" />
        </a>
      </nav>

      <section className="ceremony-gallery" aria-label="Nikah ceremony moments">
        <figure className="ceremony-gallery__feature">
          <Image
            src={siteContent.photos.withGroom}
            alt="Imam Zaniar Ahmad greeting a groom during an outdoor Nikah ceremony"
            width={1206}
            height={1494}
            priority
            sizes="(max-width: 820px) 94vw, 58vw"
          />
          <figcaption>A warm, personal presence on an important day.</figcaption>
        </figure>
        <figure>
          <Image
            src={siteContent.photos.signingNikah}
            alt="Imam Zaniar Ahmad reviewing Nikah ceremony documents outdoors"
            width={1365}
            height={2048}
            sizes="(max-width: 820px) 94vw, 28vw"
          />
          <figcaption>Clear preparation before the ceremony begins.</figcaption>
        </figure>
        <figure>
          <Image
            src={siteContent.photos.weddingOfficiant}
            alt="Imam Zaniar Ahmad holding ceremony documents at a Muslim wedding"
            width={1206}
            height={1478}
            sizes="(max-width: 820px) 94vw, 28vw"
          />
          <figcaption>Religious guidance handled with dignity and care.</figcaption>
        </figure>
      </section>

      <section className="section section--compact" id="services">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Choose Your Service</span>
            <h2>Religious, Legal, or Both</h2>
          </div>
          <p className="section-lead">
            A religious Nikah and an Ontario legal marriage are related, but
            distinct. Choose the service that matches your wedding plans.
          </p>
        </div>

        <div className="service-path-grid">
          {serviceOptions.map((option) => (
            <article className="service-path" key={option.title}>
              <div className="card-icon-row">
                <span className="card-icon"><Icon name={option.icon} /></span>
                <span className="card-meta">{option.label}</span>
              </div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <Link className="text-link" href="/contact">
                Book This Service <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>
          ))}
        </div>

        <ul className="inclusion-list" aria-label="Additional Nikah service details">
          {siteContent.weddingHighlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

      <section className="section section--compact">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Service Areas</span>
            <h2>Where Imam Zaniar Serves</h2>
          </div>
          <p className="section-lead">
            Available across Southern Ontario. Nikah ceremonies outside Ontario
            are available by request with additional travel fees.
          </p>
        </div>
        <OntarioServiceMap compact />
      </section>

      <section className="section section--muted section--compact nikah-booking-strip">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Booking Process</span>
            <h2>From Request to Ceremony</h2>
          </div>
          <div className="content-actions">
            <Link
              className="button button--primary"
              href="/contact"
            >
              Check Your Date
            </Link>
            <Link className="text-link" href="/blog/prepare-for-a-nikah-in-ontario">
              Nikkah preparation checklist for Ontario couples <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <ol className="visual-steps">
          <li><span><Icon name="message" /></span><div><strong>Send the Request</strong><p>Share the date, city, and service you need.</p></div></li>
          <li><span><Icon name="calendar" /></span><div><strong>Confirm Availability</strong><p>Review the timing, location, and travel details.</p></div></li>
          <li><span><Icon name="check" /></span><div><strong>Prepare Together</strong><p>Finalize the booking and ceremony requirements.</p></div></li>
        </ol>
      </section>

      <section className="nikah-pdf-section" id="guide-preview">
        <div className="nikah-pdf-section__heading">
          <div>
            <span className="eyebrow eyebrow--light">The Original Guide</span>
            <h2>Read the Free Nikah Guide</h2>
            <p>
              Browse the complete guide below, download a copy, or continue to
              the searchable planning notes after the document.
            </p>
          </div>
          <a
            className="button button--cream"
            href={siteContent.guide.downloadPath}
            download="nikah-guide.pdf"
          >
            Download the Nikah Guide
          </a>
        </div>
        <div className="nikah-pdf-frame">
          <iframe
            src={`${siteContent.guide.downloadPath}#view=FitH&toolbar=1&navpanes=0`}
            title="Free Nikah Guide for Ontario couples"
            loading="lazy"
          />
        </div>
        <p className="nikah-pdf-section__fallback">
          If the document viewer is unavailable on your device,{' '}
          <a href={siteContent.guide.downloadPath}>open the Nikah Guide PDF directly</a>.
        </p>
      </section>

      <section className="nikah-guide-content" id="guide">
        <header className="nikah-guide-content__intro">
          <span className="eyebrow">Searchable Planning Guide</span>
          <h2>Prepare for Your Nikah and Muslim Wedding</h2>
          <p>
            Use these practical notes to organize the religious foundations,
            Ontario marriage paperwork, and wedding-day details that are not
            covered in the service overview above.
          </p>
        </header>

        <section className="nikah-guide-block" id="nikah-foundations">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Islamic Marriage Foundations</span>
              <h2>What to Confirm Before the Nikah</h2>
            </div>
            <p className="section-lead">
              Personal or complex circumstances should be discussed privately
              with an experienced Imam before the ceremony.
            </p>
          </div>
          <div className="nikah-foundation-grid">
            {religiousFoundations.map((item, index) => (
              <article key={item.title}>
                <span className="nikah-foundation-grid__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="card-icon"><Icon name={item.icon} /></span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="nikah-guide-block" id="ontario-marriage-process">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Ontario Marriage Process</span>
              <h2>From Marriage Licence to Certificate</h2>
            </div>
            <p className="section-lead">
              These steps apply when legal Ontario marriage officiation is part
              of the booking.
            </p>
          </div>
          <ol className="nikah-legal-grid">
            {ontarioPath.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="nikah-planning-grid" id="wedding-day-checklist">
          <article className="nikah-wedding-file">
            <span className="card-icon"><Icon name="clipboard" /></span>
            <p className="card-meta">Wedding-Day File</p>
            <h2>Keep These Details Together</h2>
            <ul>
              {weddingFile.map((item) => (
                <li key={item}><Icon name="check" /><span>{item}</span></li>
              ))}
            </ul>
          </article>

          <article className="nikah-official-links">
            <span className="card-icon"><Icon name="globe" /></span>
            <p className="card-meta">Current Government Guidance</p>
            <h2>Official Ontario Resources</h2>
            <p>
              Requirements and processing times can change. Confirm the current
              information directly with Ontario.
            </p>
            <div>
              {siteContent.guide.officialLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer noopener">
                  <span>{link.label}</span>
                  <Icon name="arrow" />
                </a>
              ))}
            </div>
          </article>
        </section>

        <section className="nikah-guide-block" id="nikah-questions">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Frequently Asked Questions</span>
              <h2>Common Nikah and Wedding Questions</h2>
            </div>
          </div>
          <div className="guide-faq-grid">
            {faqItems.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </section>

      <section className="planning-guide__final">
        <div>
          <span className="eyebrow">Plan the Ceremony with Confidence</span>
          <h2>Discuss Your Nikah with Imam Zaniar Ahmad</h2>
          <p>
            Share your date, location, and whether you need a religious Nikah,
            Ontario legal marriage officiation, or both.
          </p>
        </div>
        <div className="content-actions">
          <Link
            className="button button--cream"
            href="/contact"
          >
            Book a Nikah
          </Link>
          <Link className="button button--outline-light" href="/testimonials">
            View Testimonials
          </Link>
        </div>
      </section>
    </div>
  );
}
