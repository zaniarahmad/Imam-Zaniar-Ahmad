import Image from 'next/image';
import Link from 'next/link';

import Icon from '../components/ui-icon';
import { buildMetadata } from '../../lib/metadata';
import { siteContent } from '../../lib/site-content';

const certificateImage =
  '/images/nikah/free-nikkah-nama-islamic-certificate-imam-zaniar-ahmad.png';

export const metadata = buildMetadata({
  title: 'Contact and Book Imam Zaniar Ahmad',
  description:
    'Use the Nikah booking form, call or text for Islamic lectures and fundraising, or message Imam Zaniar Ahmad on Instagram with general questions.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="page-shell contact-page">
      <section className="page-hero page-hero--with-media contact-hero">
        <div className="page-hero__copy">
          <span className="eyebrow">Contact and Booking</span>
          <h1>Choose the Right Way to Reach Imam Zaniar</h1>
          <p className="section-lead">
            Nikah bookings, lecture and fundraising requests, and general
            questions each have a dedicated contact method so your message
            reaches the right place.
          </p>
        </div>
        <figure className="page-hero__media page-hero__media--landscape">
          <Image
            src={siteContent.photos.nikahSigningMoment}
            alt="Imam Zaniar Ahmad guiding a groom through Nikah documents"
            width={1206}
            height={1491}
            priority
            sizes="(max-width: 820px) 92vw, 40vw"
          />
          <figcaption>Choose your service below to use the correct booking method.</figcaption>
        </figure>
      </section>

      <section className="contact-route-grid" aria-label="Ways to contact Imam Zaniar Ahmad">
        <article className="contact-route contact-route--nikah">
          <div className="contact-route__top">
            <span className="contact-route__icon"><Icon name="form" /></span>
            <span className="contact-route__number">01</span>
          </div>
          <p className="card-meta">Nikah and Marriage Officiation</p>
          <h2>Book Through the Nikah Form</h2>
          <p>
            Use the Google Form for religious Nikah ceremonies, Ontario legal
            marriage officiation, combined services, and travel requests.
          </p>
          <div className="response-time-badge">
            <Icon name="clock" />
            <span>
              <small>Guaranteed</small>
              {siteContent.contact.nikahResponseTime}
            </span>
          </div>
          <a
            className="button button--cream"
            href={siteContent.contact.nikahBookingForm}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="form" /> Book a Nikah
          </a>
        </article>

        <article className="contact-route contact-route--lectures">
          <div className="contact-route__top">
            <span className="contact-route__icon"><Icon name="phoneMessage" /></span>
            <span className="contact-route__number">02</span>
          </div>
          <p className="card-meta">Lectures and Fundraising</p>
          <h2>Call or Send an SMS Text</h2>
          <p>
            Use the booking number for khutbahs, lectures, workshops, mosque
            fundraising, charity appeals, and community events.
          </p>
          <a className="contact-route__phone" href={siteContent.contact.phoneHref}>
            {siteContent.contact.phoneDisplay}
          </a>
          <div className="content-actions">
            <a className="button button--primary" href={siteContent.contact.phoneHref}>
              <Icon name="phone" /> Call Now
            </a>
            <a className="button button--ghost" href={siteContent.contact.smsHref}>
              <Icon name="message" /> Send an SMS
            </a>
          </div>
          <p className="phone-channel-note">
            <Icon name="phone" />
            {siteContent.contact.phoneOnlyNote}
          </p>
        </article>

        <article className="contact-route contact-route--general">
          <div className="contact-route__top">
            <span className="contact-route__icon"><Icon name="instagram" /></span>
            <span className="contact-route__number">03</span>
          </div>
          <p className="card-meta">General Questions</p>
          <h2>Message on Instagram</h2>
          <p>
            For general questions that are not Nikah bookings, lectures, or
            fundraising requests, send Imam Zaniar a message on Instagram.
          </p>
          <a
            className="button button--primary"
            href={siteContent.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="instagram" /> Message @zanahmad
          </a>
        </article>
      </section>

      <section
        id="nikkah-certificate"
        className="contact-certificate"
        aria-labelledby="free-nikkah-certificate-title"
      >
        <div className="contact-certificate__copy">
          <span className="eyebrow">Included with Nikah Bookings</span>
          <h2 id="free-nikkah-certificate-title">
            Free Nikkah Nama Islamic Certificate
          </h2>
          <p>
            A complimentary decorative Islamic marriage certificate printed on
            sturdy legal-size cardstock, brought to your Nikkah ceremony and
            filled out on the day so your family has a beautiful keepsake from
            the occasion.
          </p>
        </div>
        <div className="contact-certificate__visual">
          <a
            className="contact-certificate__preview"
            href="#nikkah-certificate-modal"
            aria-label="View the free Nikkah Nama Islamic certificate in a full-screen preview"
          >
            <Image
              src={certificateImage}
              alt="Free Nikkah Nama Islamic certificate provided by Imam Zaniar Ahmad for Nikah bookings"
              width={902}
              height={1490}
              sizes="(max-width: 820px) 34vw, 220px"
            />
          </a>
          <a className="button button--ghost" href="#nikkah-certificate-modal">
            View Certificate Full Screen
          </a>
        </div>
      </section>

      <aside
        id="nikkah-certificate-modal"
        className="certificate-modal"
        aria-labelledby="certificate-modal-title"
        role="dialog"
        aria-modal="true"
      >
        <a
          className="certificate-modal__backdrop"
          href="#nikkah-certificate"
          aria-label="Close certificate preview"
        />
        <div className="certificate-modal__panel">
          <div className="certificate-modal__top">
            <h2 id="certificate-modal-title">Free Nikkah Nama Islamic Certificate</h2>
            <a
              className="certificate-modal__close"
              href="#nikkah-certificate"
              aria-label="Close certificate preview"
            >
              Close
            </a>
          </div>
          <Image
            src={certificateImage}
            alt="Full preview of the free Nikkah Nama Islamic certificate provided by Imam Zaniar Ahmad"
            width={902}
            height={1490}
            sizes="92vw"
          />
        </div>
      </aside>

      <section className="contact-prep">
        <div className="contact-prep__heading">
          <span className="eyebrow eyebrow--light">Before You Reach Out</span>
          <h2>Have the Essential Details Ready</h2>
        </div>
        <div className="contact-prep__items">
          <article>
            <span><Icon name="ring" /></span>
            <h3>For a Nikah</h3>
            <p>
              Have the date, city, venue, and whether you need a religious
              ceremony, Ontario legal officiation, or both.
            </p>
          </article>
          <article>
            <span><Icon name="microphone" /></span>
            <h3>For a Lecture</h3>
            <p>
              Share the organization, date, audience, location, format, and
              preferred topic when you call or text.
            </p>
          </article>
          <article>
            <span><Icon name="gift" /></span>
            <h3>For Fundraising</h3>
            <p>
              Include the organization, campaign purpose, event date, audience,
              fundraising goal, and requested format.
            </p>
          </article>
        </div>
      </section>

      <section className="closing-cta closing-cta--compact">
        <span className="closing-cta__seal" aria-hidden="true"><Icon name="book" /></span>
        <span className="eyebrow">Learn Before Booking</span>
        <h2>Explore the Services First</h2>
        <p>
          Review the Nikah and lecture pages if you are still deciding which
          service or contact method fits your plans.
        </p>
        <div className="content-actions content-actions--center">
          <Link className="button button--primary" href="/nikah">
            Explore Nikah Services
          </Link>
          <Link className="button button--quiet" href="/lectures">
            Explore Lectures and Fundraising
          </Link>
        </div>
      </section>
    </div>
  );
}
