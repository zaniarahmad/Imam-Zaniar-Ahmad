'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SiteBrand() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <Link
      className={`brand${isHomepage ? ' brand--homepage-logo' : ''}`}
      href="/"
      aria-label="Imam Zaniar Ahmad home"
    >
      {isHomepage ? (
        <Image
          className="brand__home-logo"
          src="/images/brand/elegant-iz-monogram-logo.png"
          width={240}
          height={160}
          alt="Imam Zaniar Ahmad"
          priority
        />
      ) : (
        <>
          <Image
            className="brand__mark"
            src="/favicon.svg"
            width={44}
            height={44}
            alt=""
          />
          <span className="brand__text">
            <strong>Imam Zaniar Ahmad</strong>
          </span>
        </>
      )}
    </Link>
  );
}
