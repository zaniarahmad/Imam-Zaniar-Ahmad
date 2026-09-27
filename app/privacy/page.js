import { buildMetadata } from '../../lib/metadata';
import { siteContent } from '../../lib/site-content';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'Read how imamzaniarahmad.com handles website analytics and links to Google Forms, phone, SMS, and Instagram.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <span className="eyebrow">Privacy</span>
        <h1>Privacy Policy</h1>
        <p className="section-lead">
          This policy explains how this website uses analytics and how external
          booking and contact services handle the information you choose to share.
        </p>
      </section>

      <section className="section prose">
        <h2>No Native Contact Form</h2>
        <p>
          This website does not collect booking details through its own contact
          form. Visitors are directed to the appropriate external service or
          communication channel.
        </p>

        <h2>Nikah Booking Form</h2>
        <p>
          Nikah booking requests are submitted through Google Forms. Information
          entered there is handled according to Google&apos;s terms and privacy
          practices and is used to review availability and respond to the request.
        </p>

        <h2>Phone and SMS</h2>
        <p>
          Nikah, lecture, and fundraising inquiries may be arranged through a
          regular phone call or SMS text to {siteContent.contact.phoneDisplay}.
          Your telephone provider&apos;s normal privacy and messaging terms apply.
        </p>

        <h2>Instagram</h2>
        <p>
          The website links to Imam Zaniar&apos;s Instagram profile so visitors can
          explore reminders, community work, lectures, and updates. Activity on
          Instagram is handled according to Instagram&apos;s terms and privacy
          practices.
        </p>

        <h2>Analytics</h2>
        <p>
          Google Analytics may collect usage information to help understand how
          visitors find and use the website. It is not used to collect the
          contents of Nikah booking requests, phone calls, SMS messages, or
          Instagram conversations.
        </p>

        <h2>Choose the Correct Contact Method</h2>
        <p>
          Use the Google Form to submit a detailed Nikah booking request, or call
          or send a regular SMS for Nikah, lecture, and fundraising inquiries.
          Instagram is provided as a way to learn more about Imam Zaniar.
          {` ${siteContent.contact.phoneOnlyNote}`}
        </p>
      </section>
    </div>
  );
}
