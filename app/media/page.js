import Image from 'next/image';
import Link from 'next/link';

import Icon from '../components/ui-icon';
import { buildMetadata } from '../../lib/metadata';
import { siteContent } from '../../lib/site-content';

const mediaPhotos = [
  {
    title: 'Professional Headshot',
    label: 'Recommended for most events',
    description: 'A clean portrait suitable for speaker cards, event listings, programs, and online promotion.',
    preview: siteContent.photos.portrait,
    download: '/downloads/media/imam-zaniar-ahmad-headshot.jpg',
    filename: 'imam-zaniar-ahmad-headshot.jpg',
    width: 1206,
    height: 1502,
    size: '1206 × 1502 JPG · 407 KB',
    alt: 'Professional headshot of Imam Zaniar Ahmad',
  },
  {
    title: 'Ceremonial Portrait',
    label: 'Nikah and wedding events',
    description: 'A formal portrait in ceremonial attire for Nikah programs, wedding promotion, and community events.',
    preview: siteContent.photos.weddingOfficiant,
    download: '/downloads/media/imam-zaniar-ahmad-ceremonial-portrait.jpg',
    filename: 'imam-zaniar-ahmad-ceremonial-portrait.jpg',
    width: 1206,
    height: 1478,
    size: '1206 × 1478 JPG · 716 KB',
    alt: 'Imam Zaniar Ahmad in ceremonial attire at an outdoor Nikah',
  },
  {
    title: 'Speaker Photo',
    label: 'Lectures and community programs',
    description: 'A speaking portrait for lecture posters, conference programs, mosque events, and community announcements.',
    preview: '/images/imam-zaniar/imam-zaniar-ahmad-speaking-at-nikah.webp',
    download: '/downloads/media/imam-zaniar-ahmad-speaker-photo.jpg',
    filename: 'imam-zaniar-ahmad-speaker-photo.jpg',
    width: 1066,
    height: 1600,
    size: '1066 × 1600 JPG · 333 KB',
    alt: 'Imam Zaniar Ahmad speaking with a microphone at an event',
  },
];

export const metadata = buildMetadata({
  title: 'Media Kit and Headshots',
  description:
    'Download approved high-resolution headshots and event photos of Imam Zaniar Ahmad for confirmed lectures, Nikah events, conferences, and media appearances.',
  path: '/media',
});

export default function MediaPage() {
  return (
    <div className="page-shell media-kit-page">
      <section className="page-hero media-kit-hero">
        <span className="eyebrow">For Event Organizers and Media</span>
        <h1>Media Kit and Headshots</h1>
        <p className="section-lead">
          Download an approved, high-resolution photo of Imam Zaniar Ahmad for
          a confirmed event, program, article, podcast, or community announcement.
        </p>
      </section>

      <section className="section section--compact media-downloads" aria-labelledby="media-downloads-title">
        <div className="section-heading section-heading--editorial">
          <div>
            <span className="eyebrow">Approved Images</span>
            <h2 id="media-downloads-title">Choose the Photo That Fits Your Event</h2>
          </div>
          <p className="section-lead">
            The professional headshot is the best default choice. Each button
            downloads a print-ready JPG with a clear filename.
          </p>
        </div>

        <div className="media-download-grid">
          {mediaPhotos.map((photo, index) => (
            <article className={`media-download-card${index === 0 ? ' media-download-card--featured' : ''}`} key={photo.title}>
              <figure className="media-download-card__image">
                <Image
                  src={photo.preview}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  priority={index === 0}
                  sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 31vw"
                />
              </figure>
              <div className="media-download-card__body">
                <span className="card-meta">{photo.label}</span>
                <h3>{photo.title}</h3>
                <p>{photo.description}</p>
                <span className="media-download-card__details">{photo.size}</span>
                <a className="button button--primary" href={photo.download} download={photo.filename}>
                  Download JPG <span aria-hidden="true">↓</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted section--compact media-usage">
        <div className="media-usage__copy">
          <span className="eyebrow">Usage Guidance</span>
          <h2>Using These Images</h2>
          <p>
            These photos may be used to promote a confirmed appearance by Imam
            Zaniar Ahmad or for related editorial coverage. Please keep the image
            recognizable, avoid filters that materially change its appearance,
            and identify him as <strong>Imam Zaniar Ahmad</strong>.
          </p>
        </div>
        <div className="media-usage__contact">
          <span className="card-icon"><Icon name="message" /></span>
          <h3>Need Another Format?</h3>
          <p>Contact Imam Zaniar if an organizer needs a different crop, format, or event-specific asset.</p>
          <Link className="text-link" href="/contact">
            Contact Imam Zaniar <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
