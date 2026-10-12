'use client';

import { useState } from 'react';

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

export default function CopyTextButton({ text, label }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      fallbackCopy(text);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <button
      className="button button--ghost copy-text-button"
      type="button"
      onClick={handleCopy}
      aria-live="polite"
    >
      {copied ? 'Copied!' : label} <span aria-hidden="true">{copied ? '✓' : '⧉'}</span>
    </button>
  );
}
