'use client';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="마크다운을 입력하세요..."
      className="w-full h-full border border-gray-300 rounded p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      style={{ fontFamily: 'monospace' }}
    />
  );
}
