function slugifyHeading(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function parseArticleMarkdown(source) {
  const body = source.replace(/^---[\s\S]*?---\s*/, '');
  const lines = body.split(/\r?\n/);
  const blocks = [];
  let paragraph = [];
  let quote = [];
  let orderedItems = [];

  function flushParagraph() {
    if (paragraph.length) {
      blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
      paragraph = [];
    }
  }

  function flushQuote() {
    if (quote.length) {
      blocks.push({ type: 'quote', lines: quote });
      quote = [];
    }
  }

  function flushList() {
    if (orderedItems.length) {
      blocks.push({ type: 'ordered-list', items: orderedItems });
      orderedItems = [];
    }
  }

  lines.forEach((line) => {
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    const question = line.match(/^\*\*(.+)\*\*$/);
    const listItem = line.match(/^\d+\.\s+(.+)$/);

    if (line.startsWith('>')) {
      flushParagraph();
      flushList();
      quote.push(line.replace(/^>\s?/, '').trim());
      return;
    }

    flushQuote();

    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      if (level > 1) {
        blocks.push({
          type: 'heading',
          level,
          text: heading[2],
          id: slugifyHeading(heading[2]),
        });
      }
      return;
    }

    if (question) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'question', text: question[1] });
      return;
    }

    if (listItem) {
      flushParagraph();
      orderedItems.push(listItem[1]);
      return;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      return;
    }

    flushList();
    paragraph.push(line.trim());
  });

  flushParagraph();
  flushQuote();
  flushList();

  return blocks;
}
