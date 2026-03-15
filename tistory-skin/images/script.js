document.addEventListener('DOMContentLoaded', function() {
  const contentEl = document.getElementById('md-content');
  if (!contentEl) return;

  // Get raw content and clean up Tistory's HTML wrapping
  let raw = contentEl.innerHTML;

  // Check if content looks like markdown (has # headers, ``` code blocks, etc.)
  // If it's already formatted HTML (from WYSIWYG editor), don't process
  const plainText = raw.replace(/<[^>]*>/g, '').trim();
  const markdownSignals = /^#{1,6}\s|```|\*\*|^\-\s|^\d+\.\s|^\>\s/m;
  if (!markdownSignals.test(plainText)) return;

  // Clean Tistory HTML artifacts
  raw = raw
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<\/?p[^>]*>/gi, '')
    .replace(/<\/?div[^>]*>/gi, '')
    .replace(/<\/?span[^>]*>/gi, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();

  // Initialize markdown-it
  const md = window.markdownit({
    html: false,
    linkify: true,
    typographer: true,
    highlight: function(str, lang) {
      if (lang === 'mermaid') {
        return '<div class="mermaid">' + md.utils.escapeHtml(str) + '</div>';
      }
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
            '</code></pre>';
        } catch (_) {}
      }
      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  });

  // Render markdown
  try {
    const rendered = md.render(raw);
    contentEl.innerHTML = rendered;
    contentEl.classList.add('md-rendered');

    // Initialize mermaid diagrams
    if (document.querySelector('.mermaid')) {
      mermaid.initialize({ startOnLoad: false, theme: 'default' });
      mermaid.run({ nodes: document.querySelectorAll('.mermaid') });
    }
  } catch (e) {
    console.error('Markdown rendering failed:', e);
  }
});
