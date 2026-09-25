import Link from 'next/link';

import Icon from '../components/ui-icon';
import { buildMetadata } from '../../lib/metadata';
import { siteContent } from '../../lib/site-content';

export const metadata = buildMetadata({
  title: 'Nikah Service Areas in Southern Ontario',
  description:
    'Find religious Nikah and Ontario marriage officiation services in Toronto, Mississauga, Hamilton, Oakville, Burlington, Milton, Niagara, and nearby cities.',
  path: '/locations',
});

export default function LocationsPage() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <span className="eyebrow">Service Areas</span>
        <h1>Nikah Services Across Southern Ontario</h1>
        <p className="section-lead">
          Imam Zaniar Ahmad serves couples across Toronto, the GTA, Hamilton,
          Niagara, Halton, Durham, Waterloo Region, and nearby Ontario communities.
          Choose your region for practical local booking information.
        </p>
        <div className="content-actions">
          <Link className="button button--primary" href="/contact">
            Request Your Date
          </Link>
          <Link className="button button--ghost" href="/nikah">
            Compare Nikah Services
          </Link>
        </div>
      </section>

      <section className="section section--compact">
        <div className="service-region-grid service-region-grid--locations">
          {siteContent.locationPages.map((location) => (
            <article className="service-region" key={location.slug}>
              <h2>{location.region}</h2>
              <p>{location.description}</p>
              <Link className="text-link" href={`/locations/${location.slug}`}>
                View local Nikah services <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-cta closing-cta--compact">
        <span className="closing-cta__seal" aria-hidden="true"><Icon name="compass" /></span>
        <span className="eyebrow">Another Ontario Community?</span>
        <h2>Ask About Travel Availability</h2>
        <p>
          Share the venue address and ceremony time. Availability and any
          additional travel fee will be confirmed before you book.
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
