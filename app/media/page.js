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
  {
    title: 'Studio Portrait — Copy Space Right',
    label: 'Posters and event graphics',
    description: 'A high-resolution studio portrait with open space on the right for event titles, dates, and organizer logos.',
    preview: '/images/media/imam-zaniar-ahmad-studio-portrait-copy-space-right-preview.jpg',
    download: '/downloads/media/imam-zaniar-ahmad-studio-portrait-copy-space-right.jpg',
    filename: 'imam-zaniar-ahmad-studio-portrait-copy-space-right.jpg',
    width: 5944,
    height: 3963,
    size: '5944 × 3963 JPG · 3.4 MB',
    alt: 'Studio portrait of Imam Zaniar Ahmad seated with open space on the right',
    orientation: 'landscape',
  },
  {
    title: 'Studio Portrait — Copy Space Left',
    label: 'Posters and event graphics',
    description: 'A high-resolution studio portrait with open space on the left for headlines, event details, and branding.',
    preview: '/images/media/imam-zaniar-ahmad-studio-portrait-copy-space-left-preview.jpg',
    download: '/downloads/media/imam-zaniar-ahmad-studio-portrait-copy-space-left.jpg',
    filename: 'imam-zaniar-ahmad-studio-portrait-copy-space-left.jpg',
    width: 6000,
    height: 4000,
    size: '6000 × 4000 JPG · 3.9 MB',
    alt: 'Studio portrait of Imam Zaniar Ahmad seated with open space on the left',
    orientation: 'landscape',
  },
  {
    title: 'Podcast and Media Photo',
    label: 'Interviews and digital media',
    description: 'A behind-the-scenes studio image for podcast announcements, interview promotion, and media features.',
    preview: '/images/media/imam-zaniar-ahmad-podcast-media-photo-preview.jpg',
    download: '/downloads/media/imam-zaniar-ahmad-podcast-media-photo.jpg',
    filename: 'imam-zaniar-ahmad-podcast-media-photo.jpg',
    width: 5217,
    height: 3478,
    size: '5217 × 3478 JPG · 3.7 MB',
    alt: 'Imam Zaniar Ahmad seated in a studio with a podcast microphone and camera',
    orientation: 'landscape',
  },
  {
    title: 'Transparent Headshot PNG',
    label: 'Ready for posters and graphics',
    description: 'A background-free head-and-shoulders cutout that designers can place directly onto event posters, speaker cards, and social media graphics.',
    preview: '/downloads/media/imam-zaniar-ahmad-transparent-headshot.png',
    download: '/downloads/media/imam-zaniar-ahmad-transparent-headshot.png',
    filename: 'imam-zaniar-ahmad-transparent-headshot.png',
    width: 1024,
    height: 1536,
    size: '1024 × 1536 transparent PNG · 1.9 MB',
    alt: 'Background-free headshot of Imam Zaniar Ahmad for event posters',
    orientation: 'cutout',
    downloadLabel: 'Download Transparent PNG',
  },
];

export const metadata = buildMetadata({
  title: 'Press and Media Kit',
  description:
    'Access the approved bio and download high-resolution headshots of Imam Zaniar Ahmad for lectures, Nikah events, conferences, podcasts, and media coverage.',
  path: '/media',
});

export default function MediaPage() {
  return (
    <div className="page-shell media-kit-page">
      <section className="page-hero media-kit-hero">
        <span className="eyebrow">For Event Organizers, Hosts, and Media</span>
        <h1>Press and Media Kit</h1>
        <p className="section-lead">
          Use the approved biography and download high-resolution photos of Imam
          Zaniar Ahmad for a confirmed event, program, article, podcast, or
          community announcement.
        </p>
      </section>

      <section className="section section--compact press-bio" aria-labelledby="approved-bio-title">
        <div className="press-bio__heading">
          <span className="eyebrow">Approved Biography</span>
          <h2 id="approved-bio-title">Bio for Programs and Introductions</h2>
          <p>
            This biography may be used as written for event pages, speaker
            introductions, programs, articles, and media coverage.
          </p>
        </div>
        <article className="press-bio__card">
          <span className="card-meta">Approved short bio</span>
          <p>
            Imam Zaniar Ahmad is a Canadian Islamic speaker, registered Ontario
            marriage officiant, fundraiser, and community technology entrepreneur.
            He studied Arabic and Islamic Studies at the University of Madinah and
            Quran and Chaplaincy at the College of Masjid Nabawi, and holds an MBA
            in Entrepreneurship. He performs Nikah ceremonies across Ontario,
            delivers khutbahs, lectures, and workshops, and supports Muslim
            organizations through fundraising. He is also a co-founder of
            Zakah.com, Meezan, and AutoAjr—initiatives that make Islamic services,
            Zakah guidance, and charitable giving easier to access. His approach
            is clear, practical, and light-hearted.
          </p>
          <a
            className="button button--primary"
            href="/downloads/media/imam-zaniar-ahmad-approved-bio.txt"
            download="imam-zaniar-ahmad-approved-bio.txt"
          >
            Download Approved Bio <span aria-hidden="true">↓</span>
          </a>
        </article>
      </section>

      <section className="section section--compact media-downloads" aria-labelledby="media-downloads-title">
        <div className="section-heading section-heading--editorial">
          <div>
            <span className="eyebrow">Approved Images</span>
            <h2 id="media-downloads-title">Choose the Photo That Fits Your Event</h2>
          </div>
          <p className="section-lead">
            The professional headshot is the best default choice. The previews
            are lightweight for fast browsing; each button downloads the
            original high-resolution JPG with a clear filename.
          </p>
        </div>

        <div className="media-download-grid">
          {mediaPhotos.map((photo, index) => (
            <article
              className={`media-download-card${index === 0 ? ' media-download-card--featured' : ''}${photo.orientation === 'landscape' ? ' media-download-card--landscape' : ''}${photo.orientation === 'cutout' ? ' media-download-card--cutout' : ''}`}
              key={photo.title}
            >
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
                  {photo.downloadLabel || 'Download JPG'} <span aria-hidden="true">↓</span>
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
