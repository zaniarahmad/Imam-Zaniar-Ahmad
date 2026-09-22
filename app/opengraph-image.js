import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Imam Zaniar Ahmad — Nikah Imam and Ontario marriage officiant';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px 76px',
          color: '#fffdf8',
          background: 'linear-gradient(135deg, #173d31 0%, #245a48 72%, #c5a15a 160%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 26, letterSpacing: 2 }}>
          <div style={{ width: 18, height: 18, borderRadius: 99, background: '#d8b66d' }} />
          ONTARIO, CANADA
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -3 }}>Imam Zaniar Ahmad</div>
          <div style={{ maxWidth: 950, color: '#efe7d5', fontSize: 34, lineHeight: 1.25 }}>
            Nikah ceremonies, Ontario marriage officiation, Islamic speaking, and community service
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: '#d8b66d', fontSize: 25 }}>
          Toronto · GTA · Southern Ontario
        </div>
      </div>
    ),
    size,
  );
}
