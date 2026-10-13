'use client';

import { useEffect, useId, useRef, useState } from 'react';

export default function ExpandableText({ children }) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const textRef = useRef(null);
  const textId = useId();

  useEffect(() => {
    const text = textRef.current;
    if (!text || expanded) return undefined;

    const checkOverflow = () => {
      setCanExpand(text.scrollHeight > text.clientHeight + 1);
    };

    checkOverflow();
    document.fonts?.ready.then(checkOverflow);

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(text);

    return () => observer.disconnect();
  }, [children, expanded]);

  return (
    <>
      <p
        id={textId}
        ref={textRef}
        className={`expandable-copy__text${expanded ? '' : ' expandable-copy__text--collapsed'}`}
      >
        {children}
      </p>
      {canExpand || expanded ? (
        <button
          className="expandable-copy__toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls={textId}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? 'See less' : 'See more'}
        </button>
      ) : null}
    </>
  );
}
