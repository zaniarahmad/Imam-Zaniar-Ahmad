'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GUIDE_PATH = '/downloads/nikah-guide.pdf';
const NIKAH_FORM_HOST = 'docs.google.com';

function cleanLabel(value = '') {
  return value.replace(/\s+/g, ' ').trim().slice(0, 100);
}

function inferLeadType(anchor, pathname) {
  const requestedService = new URLSearchParams(window.location.search).get('service');
  if (requestedService === 'workshop') return 'workshop';
  if (anchor.dataset.analyticsLeadType) return anchor.dataset.analyticsLeadType;
  if (anchor.closest('.contact-route--nikah')) return 'nikah';
  if (anchor.closest('.contact-route--lectures')) return 'speaking';
  if (pathname.startsWith('/workshops')) return 'workshop';
  if (pathname.startsWith('/lectures')) return 'speaking';
  if (pathname.startsWith('/nikah') || pathname.startsWith('/locations')) return 'nikah';
  return 'general';
}

function sendEvent(eventName, parameters) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('event', eventName, parameters);
}

export default function ConversionTracking() {
  const pathname = usePathname();

  useEffect(() => {
    const trackClick = (event) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest('a[href]');
      if (!anchor) return;

      const rawHref = anchor.getAttribute('href') || '';
      const label = cleanLabel(anchor.textContent || anchor.getAttribute('aria-label'));
      const common = {
        page_path: window.location.pathname,
        cta_text: label || 'Unlabelled link',
        transport_type: 'beacon',
      };

      if (rawHref.startsWith('tel:')) {
        sendEvent('generate_lead', {
          ...common,
          lead_type: inferLeadType(anchor, pathname),
          contact_method: 'phone',
        });
        return;
      }

      if (rawHref.startsWith('sms:')) {
        sendEvent('generate_lead', {
          ...common,
          lead_type: inferLeadType(anchor, pathname),
          contact_method: 'text',
        });
        return;
      }

      if (rawHref.startsWith('mailto:')) {
        sendEvent('generate_lead', {
          ...common,
          lead_type: inferLeadType(anchor, pathname),
          contact_method: 'email',
        });
        return;
      }

      let destination;
      try {
        destination = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (destination.hostname === NIKAH_FORM_HOST) {
        sendEvent('generate_lead', {
          ...common,
          lead_type: 'nikah',
          contact_method: 'booking_form',
        });
        return;
      }

      if (destination.pathname === GUIDE_PATH) {
        sendEvent('nikah_guide_download', {
          ...common,
          file_name: 'nikah-guide.pdf',
          file_extension: 'pdf',
          content_type: 'nikah_guide',
        });
      }
    };

    document.addEventListener('click', trackClick, true);
    return () => document.removeEventListener('click', trackClick, true);
  }, [pathname]);

  return null;
}
