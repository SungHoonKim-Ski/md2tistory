'use client';

import { useState } from 'react';
import { applyInlineStyles } from '@/lib/inline-styles';
import { copyRichText } from '@/lib/clipboard';

type CopyStatus = 'idle' | 'success' | 'error';

export default function CopyButton() {
  const [status, setStatus] = useState<CopyStatus>('idle');

  const handleCopy = async () => {
    const previewDiv = document.getElementById('preview-content');
    if (!previewDiv) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }

    try {
      const html = previewDiv.innerHTML;
      const styledHtml = applyInlineStyles(html);
      await copyRichText(styledHtml);
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const labelMap: Record<CopyStatus, string> = {
    idle: '복사하기',
    success: '클립보드에 복사됨!',
    error: '복사 실패',
  };

  const colorMap: Record<CopyStatus, string> = {
    idle: 'bg-blue-500 hover:bg-blue-600',
    success: 'bg-green-500 hover:bg-green-600',
    error: 'bg-red-500 hover:bg-red-600',
  };

  return (
    <button
      onClick={handleCopy}
      className={`w-full py-3 px-6 rounded text-white font-semibold transition-colors duration-150 ${colorMap[status]}`}
    >
      {labelMap[status]}
    </button>
  );
}
