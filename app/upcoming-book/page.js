import Image from 'next/image';
import { buildMetadata } from '../../lib/metadata';
import BookSignup from './signup';
import styles from './page.module.css';

export const metadata = buildMetadata({ title: 'Happily Ever After: Upcoming Marriage Book', description: 'Happily Ever After by Sheikh Alaa Elsayed and Imam Zaniar Ahmad, coming Ramadan 2027. Preview the marriage topics and receive launch updates.', path: '/upcoming-book' });
const chapters = [
  { title: 'Finding the Right Person', teaser: 'Character beyond appearances. Attraction without overlooking the warning signs.', topics: ['Preparing yourself for marriage', 'Deen, character and emotional maturity', 'Attraction, green flags and warning signs', 'Choosing who someone is today'] },
  { title: 'Determining Compatibility', teaser: 'The conversations about money, family and expectations that belong before “yes.”', topics: ['Asking meaningful questions', 'Money, debt and lifestyle expectations', 'Faith, family influence and communication', 'Housing, careers, children and household roles'] },
  { title: 'Engagement, Nikah and Wedding', teaser: 'A meaningful beginning, without unnecessary delays, waste or debt.', topics: ['Islamic boundaries while getting acquainted', 'The wali, witnesses and consent', 'Moving towards nikah with clear priorities', 'A dignified walimah without waste or debt'] },
  { title: 'Living the Marriage', teaser: 'Love in everyday life: communicating, repairing and growing together.', topics: ['Communication and conflict resolution', 'Money and shared responsibilities', 'Intimacy, affection and privacy', 'In-laws, boundaries and marital trust', 'Spiritual growth through hardship and change'] },
];
export default function UpcomingBookPage() {
  return <div className={`page-shell ${styles.page}`}>
    <section className={styles.hero} aria-labelledby="book-title">
      <div className={styles.heroCopy}>
        <p className={styles.release}>Coming Ramadan 2027</p>
        <h1 id="book-title">Happily<br /><em>Ever After</em></h1><p className={styles.subtitle}>The Secrets to a Successful Marriage</p>
        <ul className={styles.focuses}><li><strong>Finding the right spouse.</strong> Choose with clarity, compatibility and confidence.</li><li><strong>Building a thriving marriage.</strong> Strengthen love, communication and a lasting partnership.</li></ul>
        <BookSignup />
      </div>
      <div className={styles.visual}>
        <div className={styles.cover}>
          <Image src="/images/book/happily-ever-after-cover.png" alt="A red heart-shaped balloon carrying a small home, the cover illustration used on Sheikh Alaa’s website" fill priority sizes="(max-width: 800px) 270px, 340px" />
          <div className={styles.coverTitle}>Happily<br /><em>Ever After</em></div><p className={styles.coverSubtitle}>The Secrets to a<br />Successful Marriage</p><p className={styles.coverAuthors}>Sheikh Alaa Elsayed<br />Imam Zaniar Ahmad</p>
        </div><p className={styles.coverNote}>Cover preview. Subtitle subject to final approval.</p>
      </div>
    </section>
    <section className={styles.inside} id="topic-preview" aria-labelledby="inside-title">
      <div className={styles.illustration}><Image src="/images/book/marriage-journey.png" alt="Illustration of a Muslim couple walking together beside the water towards their home" fill sizes="(max-width: 800px) 100vw, 40vw" /><p>A wedding is a beginning.<br /><em>A marriage is a life.</em></p></div>
      <div className={styles.contents}><p className={styles.eyebrow}>Inside the book</p><h2 id="inside-title">Before the yes.<br /><em>Beyond the wedding.</em></h2><p className={styles.description}>Rooted in the Qur&apos;an and Sunnah, informed by counselling experience, and written for the realities Muslims face today.</p>
        <div className={styles.chapterList}>{chapters.map(chapter => <details className={styles.chapter} key={chapter.title}><summary><span><strong>{chapter.title}</strong><span className={styles.teaser}>{chapter.teaser}</span></span><span className={styles.expand} aria-hidden="true" /></summary><ul>{chapter.topics.map(topic => <li key={topic}>{topic}</li>)}</ul></details>)}</div>
        <p className={styles.previewNote}>A topic preview, not a finalized table of contents.</p>
      </div>
    </section>
    <section className={styles.closing} aria-labelledby="closing-title"><p className={styles.eyebrow}>For the journey you&apos;re on</p><h2 id="closing-title">Preparing for marriage?<br />Already sharing a life?</h2><p>For singles, couples and the families supporting them. Clear Islamic principles, honest conversations and advice to put into practice.</p><a href="#book-email" className="button button--primary">Get book updates</a></section>
  </div>;
}
