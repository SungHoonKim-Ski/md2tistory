'use client';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const { selectionStart, selectionEnd } = textarea;
      const newValue =
        value.substring(0, selectionStart) + '    ' + value.substring(selectionEnd);
      onChange(newValue);
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 4;
      });
    }
  };

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="마크다운을 입력하세요..."
      className="w-full h-full border border-gray-300 rounded p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      style={{ fontFamily: 'monospace' }}
    />
  );
}
