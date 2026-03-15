'use client';

import { useState } from 'react';
import MarkdownEditor from '@/components/MarkdownEditor';
import MarkdownPreview from '@/components/MarkdownPreview';
import CopyButton from '@/components/CopyButton';

const DEFAULT_MARKDOWN = `# MD → Tistory Converter

마크다운을 티스토리 블로그에 붙여넣기 가능한 리치텍스트로 변환하는 도구입니다.

## 사용 방법

1. 왼쪽에 마크다운을 입력하세요
2. 오른쪽 미리보기에서 결과를 확인하세요
3. **"복사하기"** 버튼을 클릭하세요
4. 티스토리 글쓰기 화면에서 붙여넣기 (Ctrl+V / Cmd+V)

## 지원 기능

### 1. 제목 (Heading)

# 제목 1 (H1) → 티스토리 제목1
## 제목 2 (H2) → 티스토리 제목2
### 제목 3 (H3) → 티스토리 제목3
#### 제목 4 (H4)

티스토리 에디터의 제목 블록으로 자동 변환됩니다.

### 2. 텍스트 스타일링

**굵은 텍스트**, *기울임 텍스트*, ~~취소선 텍스트~~를 지원합니다.
***굵은 기울임 텍스트***도 가능합니다.

### 3. 코드 블록

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}
\`\`\`

\`\`\`python
def calculate(a, b):
    result = a + b
    return result
\`\`\`

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

\`\`\`sql
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.name
HAVING order_count > 5;
\`\`\`

\`\`\`kotlin
fun main() {
    val message = "Hello, Kotlin!"
    println(message)
}
\`\`\`

\`\`\`json
{
  "name": "md2tistory",
  "version": "1.0.0",
  "dependencies": {
    "react": "^19.0.0"
  }
}
\`\`\`

\`\`\`bash
#!/bin/bash
echo "배포 시작"
npm run build && npm run deploy
\`\`\`

### 4. 인라인 코드

\`const x = 10;\` 이런 식으로 코드를 강조할 수 있습니다.
DB 대비 \`~3.7x\` 향상으로 충분합니다.

### 5. 인용구

> 중요한 내용은 인용구로 강조할 수 있습니다.
> 여러 줄도 가능해요!

### 6. 리스트

**순서 있는 리스트:**
1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목

**순서 없는 리스트:**
- 불렛 포인트 1
- 불렛 포인트 2
  - 중첩 항목
  - 중첩 항목
- 불렛 포인트 3

### 7. 표 (Table)

| 항목 | 설명 | 비고 |
|------|------|------|
| 마크다운 | 텍스트 기반 문서 형식 | 간편함 |
| HTML | 웹 마크업 언어 | 복잡함 |
| 리치텍스트 | 서식이 포함된 텍스트 | 시각적 |

표 안에서도 \`인라인 코드\`와 **굵은 텍스트**를 사용할 수 있습니다.

### 8. 링크

[티스토리](https://www.tistory.com)를 방문해보세요.

### 9. 이미지

![대체 텍스트](https://via.placeholder.com/400x200)

### 10. 수평선 (구분선)

위 내용과 아래 내용을 구분할 때:

---

티스토리 기본 구분선 스타일로 변환됩니다.

### 11. 체크리스트

- [x] 마크다운 입력
- [x] 미리보기 확인
- [ ] 복사하기 클릭
- [ ] 티스토리에 붙여넣기

---

**완성!** 이제 위의 마크다운을 지우고 원하는 내용을 입력해보세요.
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
          <div className="mt-2 text-sm text-gray-600">
            📝 <strong>사용 방법:</strong> 1. 왼쪽에 마크다운 입력 → 2. &quot;복사하기&quot; 버튼 클릭 → 3. 티스토리 글쓰기에서 붙여넣기 (Ctrl+V)
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 h-full">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">마크다운 입력</label>
            </div>
            <div className="flex-1 h-[70vh] md:h-[70vh]">
              <MarkdownEditor value={markdown} onChange={setMarkdown} />
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">미리보기</label>
              <CopyButton />
            </div>
            <div className="flex-1 h-[70vh] md:h-[70vh]">
              <MarkdownPreview markdown={markdown} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
