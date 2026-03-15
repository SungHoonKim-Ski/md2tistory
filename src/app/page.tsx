'use client';

import { useState } from 'react';
import MarkdownEditor from '@/components/MarkdownEditor';
import MarkdownPreview from '@/components/MarkdownPreview';
import CopyButton from '@/components/CopyButton';

const DEFAULT_MARKDOWN = `# 제목 1

## 제목 2

일반 문단 텍스트입니다. **굵은 텍스트**와 *이탤릭 텍스트*를 사용할 수 있습니다.

### 코드 블록

\`\`\`javascript
function hello(name) {
  console.log(\`Hello, \${name}!\`);
}
hello('World');
\`\`\`

인라인 코드: \`const x = 42;\`

### 목록

- 항목 1
- 항목 2
  - 중첩 항목 2-1
  - 중첩 항목 2-2
- 항목 3

1. 첫 번째
2. 두 번째
3. 세 번째

### 표

| 이름 | 나이 | 직업 |
|------|------|------|
| 홍길동 | 30 | 개발자 |
| 김철수 | 25 | 디자이너 |

### 인용구

> 이것은 인용구입니다.
> 여러 줄로 작성할 수 있습니다.

### 링크

[GitHub](https://github.com)을 방문해보세요.

---

~~취소선 텍스트~~
`;

export default function Home() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">MD → Tistory Converter</h1>
          <p className="text-sm text-gray-500 mt-1">
            마크다운을 티스토리 블로그에 붙여넣기 가능한 리치텍스트로 변환합니다
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 h-full">
          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              마크다운 입력
            </label>
            <div className="flex-1 h-[70vh] md:h-[70vh]">
              <MarkdownEditor value={markdown} onChange={setMarkdown} />
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              미리보기
            </label>
            <div className="flex-1 h-[70vh] md:h-[70vh]">
              <MarkdownPreview markdown={markdown} />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <CopyButton />
        </div>
      </main>
    </div>
  );
}
