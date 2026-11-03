import Image from 'next/image';
import Link from 'next/link';

export default function SiteBrand() {
  return (
    <Link
      className="brand brand--logo"
      href="/"
      aria-label="Imam Zaniar Ahmad home"
    >
      <Image
        className="brand__logo"
        src="/images/brand/imam-zaniar-horizontal-logo.png"
        width={2061}
        height={685}
        alt="Imam Zaniar Ahmad"
        priority
        sizes="(max-width: 540px) 132px, (max-width: 1120px) 141px, 157px"
      />
    </Link>
  );
}
