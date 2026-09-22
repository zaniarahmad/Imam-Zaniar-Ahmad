import Image from 'next/image';
import Link from 'next/link';
import { Roboto } from 'next/font/google';

import Icon from '../components/ui-icon';
import { buildBreadcrumbJsonLd, buildMetadata } from '../../lib/metadata';
import { siteContent } from '../../lib/site-content';

const reviewFont = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', item: siteContent.siteUrl },
  { name: 'Testimonials', item: `${siteContent.siteUrl}/testimonials` },
]);

const trustMetrics = [
  { icon: 'ring', value: '300+', label: 'Nikkahs Officiated' },
  { icon: 'star', value: '110', label: 'Google Reviews' },
  { icon: 'calendar', value: 'Since 2017', label: 'Serving the Community' },
  { icon: 'microphone', value: '1,000+', label: 'Featured Event Appearances' },
];

const featuredReviews = [
  {
    name: 'Lucas Sahipaul',
    avatar: '/images/testimonials/lucas-sahipaul.webp',
    quote:
      'Had a great experience with Imam Zaniar, my non-arab friends who had never been to an Islamic ceremony said he was excellent and masterfully demonstrated the beauty of our faith. He was funny, supportive, encouraging and his timing was great. Highly recommend!',
  },
  {
    name: 'Muhammad Razaq',
    avatar: '/images/testimonials/muhammad-razaq.webp',
    quote:
      'Imam Zaniar did an amazing job with the nikkah we were very blessed to have him complete the ceremony! He made the ceremony so engaging and everyone was talking about how personable he was and how he set the tone for the whole evening. We are very grateful.',
  },
  {
    name: 'Ziad Ismail',
    avatar: '/images/testimonials/ziad-ismail.webp',
    quote:
      'Imam was spectacular. We had a small group of people - some of which were non-muslim - and he explained everything wonderfully. He had a good balance of intentional practice and humour. The ceremony was given importance while being light hearted. Would recommend 100%.',
  },
  {
    name: 'Sam Balika',
    avatar: '/images/testimonials/sam-balika.webp',
    quote:
      'The speech was absolutely perfect the timing was excellent and over all a great experience, if you are getting married you need to hire this imam he\'s sure to have your audiences full attention with his interactive style! 10/10!',
  },
  {
    name: 'Mohamed Ibrahim',
    avatar: '/images/testimonials/mohamed-ibrahim.webp',
    quote:
      'Great experience with Imam Zaniar. He was punctual, organized, and made sure both the Islamic and legal requirements were done correctly. Highly recommended. Thank you Imam Zaniar!',
  },
  {
    name: 'Sarah Jamil',
    avatar: '/images/testimonials/rayan-abdulwahab.webp',
    quote:
      'I\'m very thankful to Imam Zaniar for doing such a great job at my nikkah. He made everything easy, meaningful, and well organized. Imam Zaniar kept our crowd engaged, entertained, and made the ceremony fun while still being professional. May Allah reward him.',
  },
];

export const metadata = buildMetadata({
  title: 'Nikah Reviews and Testimonials',
  description:
    'Explore 110 Google reviews and community feedback for Imam Zaniar Ahmad, with 300+ Nikkahs and appearances at 1,000+ events since 2017.',
  path: '/testimonials',
});

export default function TestimonialsPage() {
  return (
    <div className="page-shell testimonials-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="page-hero page-hero--with-media testimonials-page__hero">
        <div className="page-hero__copy">
          <span className="eyebrow">Testimonials</span>
          <h1>Trusted by Couples, Families, and Communities</h1>
          <p className="section-lead">
            People remember calm guidance, clear communication, and personal care
            on important days. Explore Imam Zaniar Ahmad&apos;s Google Business
            Profile and community feedback below.
          </p>
        </div>
        <figure className="page-hero__media page-hero__media--portrait testimonials-page__portrait">
          <Image
            src={siteContent.photos.gardenCeremony}
            alt="Imam Zaniar Ahmad at an outdoor wedding ceremony"
            width={1128}
            height={1394}
            priority
            sizes="(max-width: 820px) 92vw, 38vw"
          />
          <figcaption>Serving couples and communities since 2017.</figcaption>
        </figure>
      </section>

      <section className="review-wall" aria-labelledby="featured-reviews-title">
        <div className="review-wall__heading">
          <div>
            <span className="eyebrow">In Their Words</span>
            <h2 id="featured-reviews-title">Guidance People Remember</h2>
          </div>
          <p>
            First-hand reflections from couples, families, and guests who
            experienced Imam Zaniar&apos;s care, clarity, and engaging approach.
          </p>
        </div>

        <div className={`${reviewFont.className} review-wall__grid`}>
          {featuredReviews.map((review) => (
            <article className="review-quote" key={review.name}>
              <header className="review-quote__author">
                <Image
                  src={review.avatar}
                  alt=""
                  width={52}
                  height={52}
                  className="review-quote__avatar"
                />
                <div>
                  <strong>{review.name}</strong>
                </div>
              </header>
              <div className="review-quote__rating" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Icon name="star" key={star} />
                ))}
              </div>
              <blockquote>
                <p>{review.quote}</p>
              </blockquote>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonial-metrics" aria-label="Community experience">
        {trustMetrics.map((metric) => (
          <article key={metric.label}>
            <span className="testimonial-metrics__icon"><Icon name={metric.icon} /></span>
            <div>
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="reviews-showcase">
        <div className="reviews-showcase__proof">
          <div className="reviews-showcase__stars" aria-label="Google review community">
            {[0, 1, 2, 3, 4].map((star) => (
              <Icon name="star" key={star} />
            ))}
          </div>
          <span className="eyebrow eyebrow--light">Google Reviews</span>
          <strong>{siteContent.reviews.reportedCount}</strong>
          <p>reviews from couples, families, and community members</p>
          <div className="reviews-showcase__monogram" aria-hidden="true">G</div>
        </div>

        <div className="reviews-showcase__copy">
          <span className="eyebrow eyebrow--light">Community Trust</span>
          <h2>Care People Remember</h2>
          <p>{siteContent.reviews.note}</p>
          <div className="reviews-showcase__assurances">
            <span><Icon name="check" /> Clear preparation</span>
            <span><Icon name="heart" /> Personal care</span>
            <span><Icon name="document" /> Religious and legal clarity</span>
          </div>
          <div
            className="reviews-showcase__embed"
            aria-label="Google Business Profile map for Imam Zaniar Ahmad"
          >
            <iframe
              src={siteContent.reviews.googleMapsEmbedUrl}
              title="Imam Zaniar Ahmad Google Business Profile"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="content-actions">
            {siteContent.reviews.reviewsUrl ? (
              <a
                className="button button--cream"
                href={siteContent.reviews.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Reviews on Google
              </a>
            ) : null}
            <Link className="button button--outline-light" href="/contact">
              Contact Imam Zaniar
            </Link>
          </div>
        </div>
      </section>

      <section className="closing-cta closing-cta--compact">
        <span className="closing-cta__seal" aria-hidden="true"><Icon name="message" /></span>
        <span className="eyebrow">Plan Your Occasion</span>
        <h2>Start with a Clear Conversation</h2>
        <p>
          Share the date, location, and service you need to discuss availability
          with Imam Zaniar Ahmad.
        </p>
        <div className="content-actions content-actions--center">
          <Link className="button button--primary" href="/contact">
            Contact Imam Zaniar
          </Link>
          <Link className="button button--quiet" href="/nikah">
            Explore Nikah Services
          </Link>
          <Link className="button button--quiet" href="/locations">
            View Ontario Service Areas
          </Link>
        </div>
      </section>
    </div>
  );
}
