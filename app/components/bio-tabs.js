'use client';

import { useState } from 'react';

import CopyTextButton from './copy-text-button';

export default function BioTabs({ longBio, shortBio }) {
  const [activeBio, setActiveBio] = useState('long');
  const isLong = activeBio === 'long';
  const bio = isLong ? longBio : shortBio;

  return (
    <article className="press-bio__card">
      <div className="press-bio__tabs" role="tablist" aria-label="Biography length">
        <button
          id="long-bio-tab"
          className={isLong ? 'press-bio__tab press-bio__tab--active' : 'press-bio__tab'}
          type="button"
          role="tab"
          aria-selected={isLong}
          aria-controls="approved-bio-panel"
          tabIndex={isLong ? 0 : -1}
          onClick={() => setActiveBio('long')}
        >
          Long Bio
        </button>
        <button
          id="short-bio-tab"
          className={!isLong ? 'press-bio__tab press-bio__tab--active' : 'press-bio__tab'}
          type="button"
          role="tab"
          aria-selected={!isLong}
          aria-controls="approved-bio-panel"
          tabIndex={!isLong ? 0 : -1}
          onClick={() => setActiveBio('short')}
        >
          Short Bio
        </button>
      </div>

      <div
        id="approved-bio-panel"
        className="press-bio__panel"
        role="tabpanel"
        aria-labelledby={isLong ? 'long-bio-tab' : 'short-bio-tab'}
      >
        <span className="card-meta">{isLong ? 'Standard approved bio' : 'Short approved bio'}</span>
        <p>{bio}</p>
        <div className="press-bio__actions">
          <CopyTextButton text={bio} label={isLong ? 'Copy Long Bio' : 'Copy Short Bio'} />
          <a
            className="button button--primary"
            href="/downloads/media/imam-zaniar-ahmad-approved-bio.txt"
            download="imam-zaniar-ahmad-approved-bio.txt"
          >
            Download Both Bios <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </article>
  );
}
