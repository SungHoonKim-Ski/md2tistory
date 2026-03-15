import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MD → Tistory Converter',
  description: '마크다운을 티스토리 블로그에 붙여넣기 가능한 리치텍스트로 변환합니다',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
