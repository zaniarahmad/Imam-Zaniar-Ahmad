import Image from 'next/image';
import Link from 'next/link';

import Icon from './components/ui-icon';
import OntarioServiceMap from './components/ontario-service-map';
import ProjectShowcase from './components/project-showcase';
import { buildMetadata } from '../lib/metadata';
import { siteContent } from '../lib/site-content';

export const metadata = buildMetadata({
  title: 'Nikah Imam and Islamic Marriage Officiant in Ontario',
  description:
    'Book Imam Zaniar Ahmad for a religious Nikah, Ontario legal marriage officiation, or both across Toronto, the GTA, and Southern Ontario.',
  path: '/',
});

const nikahOptions = [
  {
    icon: 'ring',
    label: 'Religious Service',
    title: 'Religious Nikah',
    description:
      'An Islamic marriage ceremony centred on consent, the wali, mahr, witnesses, and a meaningful beginning.',
    cta: 'Book a Religious Nikah',
  },
  {
    icon: 'document',
    label: 'Legal Service',
    title: 'Ontario Legal Officiation',
    description:
      'Legal marriage officiation for couples who have the required Ontario marriage licence and documents.',
    cta: 'Book Legal Officiation',
  },
  {
    icon: 'layers',
    label: 'Combined Service',
    title: 'Nikah and Legal Officiation',
    description:
      'The religious ceremony and Ontario legal officiation thoughtfully coordinated for the same occasion.',
    cta: 'Book Both Services',
  },
];

export default function Home() {
  return (
    <div className="page-shell home-page">
      <section className="hero hero--home">
        <div className="hero__copy">
          <span className="eyebrow eyebrow--light">Imam Zaniar Ahmad</span>
          <h1>
            Nikah Imam in Ontario | Islamic Marriage Officiant for Toronto, GTA
            &amp; Southern Ontario
          </h1>
          <p className="hero__tagline">A Meaningful Beginning, Held with Care</p>
          <p className="hero__lead">
            Religious Nikah ceremonies, Ontario legal marriage officiation, and
            thoughtful speaking engagements for Muslim communities.
          </p>

          <div className="hero-actions">
            <Link
              className="button button--cream"
              href="/contact"
            >
              Book a Nikah
            </Link>
            <Link className="button button--gold" href="/lectures">
              Explore Lectures &amp; Fundraising
            </Link>
          </div>
          <p className="hero-response-note">
            <Icon name="clock" />
            <strong>{siteContent.contact.nikahResponseTime}</strong>
            <span>after using the Nikah form on the Contact page</span>
          </p>

          <div className="hero__secondary-actions">
            <Link href="/nikah#guide-preview">
              Get the Free Nikkah Guide <span aria-hidden="true">&rarr;</span>
            </Link>
            <a href={siteContent.contact.phoneHref}>
              Call for Lectures or Fundraising
            </a>
          </div>
        </div>

        <div className="hero__portrait" aria-label="Portrait of Imam Zaniar Ahmad">
          <div className="hero__arch" aria-hidden="true" />
          <Image
            src={siteContent.heroImage}
            alt="Imam Zaniar Ahmad speaking during a Nikah ceremony"
            width={1066}
            height={1600}
            priority
            sizes="(max-width: 820px) 88vw, 34vw"
            className="hero-photo"
          />
          <div className="hero__caption">
            <span>Ontario</span>
            <strong>Registered Marriage Officiant</strong>
          </div>
        </div>

        <div className="hero__credentials" aria-label="Nikah service options">
          <div>
            <span>01</span>
            <p>Religious Nikah Ceremony</p>
          </div>
          <div>
            <span>02</span>
            <p>Ontario Legal Officiation</p>
          </div>
          <div>
            <span>03</span>
            <p>Both Services Together</p>
          </div>
        </div>
      </section>

      <section className="section section--compact section--service-choice">
        <div className="section-heading section-heading--editorial">
          <div>
            <span className="eyebrow">Nikah Services</span>
            <h2>Choose the Service You Need</h2>
          </div>
          <p className="section-lead">
            Know exactly what you are booking before the wedding day. Choose a
            religious ceremony, legal Ontario officiation, or both.
          </p>
        </div>

        <div className="service-path-grid">
          {nikahOptions.map((option) => (
            <article className="service-path" key={option.title}>
              <div className="card-icon-row">
                <span className="card-icon"><Icon name={option.icon} /></span>
                <span className="card-meta">{option.label}</span>
              </div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <Link className="text-link" href="/contact">
                {option.cta} <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--compact mission-feature">
        <div className="mission-feature__media">
          <Image
            src={siteContent.photos.communityEvent}
            alt="Imam Zaniar Ahmad serving at a Muslim community gathering"
            width={1448}
            height={1086}
            sizes="(max-width: 820px) 92vw, 48vw"
            className="mission-feature__main-image"
          />
          <Image
            src={siteContent.photos.portrait}
            alt="Portrait of Imam Zaniar Ahmad"
            width={1206}
            height={1502}
            sizes="(max-width: 540px) 38vw, 16vw"
            className="mission-feature__accent-image"
          />
        </div>

        <div className="mission-feature__copy">
          <span className="eyebrow">About Imam Zaniar</span>
          <h2>A Mission Grounded in Faith and Service</h2>
          <p>
            Imam Zaniar Ahmad serves Muslim communities at the meeting point of
            faith, family, practical education, and technology. His work is
            focused on making important religious services easier to understand
            and access.
          </p>
          <p>
            Alongside Nikah officiation, he speaks with students, families, and
            community organizations about faith, responsible ambition, and
            building a meaningful life without losing sight of Islamic values.
          </p>
          <ul className="mission-points">
            {siteContent.biographyNotes.map((note) => (
              <li key={note}><Icon name="check" />{note}</li>
            ))}
          </ul>
          <div className="content-actions">
            <Link className="button button--primary" href="/about">
              Learn About Imam Zaniar
            </Link>
            <Link className="button button--ghost" href="/lectures">
              Explore Lectures &amp; Fundraising
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--compact section--projects section--projects-featured">
        <div className="section-heading section-heading--editorial">
          <div>
            <span className="eyebrow">Community Projects</span>
            <h2>Tools Built to Serve</h2>
          </div>
          <div className="section-heading__aside">
            <p className="section-lead">
              Three initiatives co-founded by Imam Zaniar that support Islamic
              services, Zakah education, and charitable giving.
            </p>
            <Link className="section-link" href="/projects">
              View All Projects <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <ProjectShowcase compact />
      </section>

      <section className="section section--compact section--locations">
        <div className="section-heading section-heading--editorial">
          <div>
            <span className="eyebrow">Service Areas</span>
            <h2>Serving Communities Across Ontario</h2>
          </div>
          <p className="section-lead">
            Serving Toronto, Peel–Halton, Hamilton–Waterloo, and Niagara–Brant.
            Nikah ceremonies outside Ontario are available by request with
            additional travel fees.
          </p>
        </div>

        <OntarioServiceMap compact />
      </section>

      <section className="home-resource-grid home-resource-grid--single">
        <article className="guide-feature guide-feature--compact">
          <span className="feature-icon"><Icon name="book" /></span>
          <span className="eyebrow">Free Wedding Resource</span>
          <h2>{siteContent.guide.title}</h2>
          <p>
            Prepare for the religious ceremony, Ontario marriage requirements,
            and the details worth confirming before your wedding day.
          </p>
          <div className="content-actions">
            <Link className="button button--primary" href="/nikah#guide-preview">
              Read the Free Nikah Guide
            </Link>
            <Link className="text-link" href="/nikah">
              Explore Nikah Services <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </article>
      </section>

      <section className="closing-cta closing-cta--compact">
        <span className="closing-cta__seal" aria-hidden="true"><Icon name="ring" /></span>
        <span className="eyebrow">Book Your Service</span>
        <h2>Plan Your Nikah with Clarity</h2>
        <p>
          Share your date, location, and whether you need a religious ceremony,
          Ontario legal officiation, or both.
        </p>
        <p className="closing-response-note">
          <Icon name="clock" />
          <strong>{siteContent.contact.nikahResponseTime}</strong>
          after submitting the Nikah booking form
        </p>
        <div className="content-actions content-actions--center">
          <Link
            className="button button--primary"
            href="/contact"
          >
            Book a Nikah
          </Link>
          <Link className="button button--quiet" href="/nikah#guide-preview">
            Read the Free Nikah Guide
          </Link>
          <Link className="button button--quiet" href="/contact">
            Contact Imam Zaniar
          </Link>
        </div>
      </section>
    </div>
  );
}
