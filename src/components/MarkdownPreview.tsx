'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface MarkdownPreviewProps {
  markdown: string;
}

export default function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  return (
    <div
      id="preview-content"
      className="w-full h-full overflow-auto border border-gray-300 rounded p-4 bg-white prose prose-sm max-w-none"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeHighlight]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
