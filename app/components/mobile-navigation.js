'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import ActiveNavLink from './active-nav-link';

export default function MobileNavigation({ links }) {
  const detailsRef = useRef(null);
  const pathname = usePathname();

  const closeMenu = () => {
    detailsRef.current?.removeAttribute('open');
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const handleOutsidePress = (event) => {
      const menu = detailsRef.current;

      if (menu?.open && !menu.contains(event.target)) {
        closeMenu();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        detailsRef.current?.querySelector('summary')?.focus();
      }
    };

    document.addEventListener('pointerdown', handleOutsidePress);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleOutsidePress);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <details className="mobile-nav" ref={detailsRef}>
      <summary aria-label="Open navigation">Menu</summary>
      <nav
        className="mobile-nav__panel"
        aria-label="Mobile"
        onClick={(event) => {
          if (event.target.closest('a')) closeMenu();
        }}
      >
        {links.map((link) => (
          <ActiveNavLink key={link.href} href={link.href}>
            {link.label}
          </ActiveNavLink>
        ))}
        <Link href="/contact">Book a Nikah</Link>
      </nav>
    </details>
  );
}
