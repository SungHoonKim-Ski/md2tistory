const elementStyles: Record<string, string> = {
  h2: "font-size:1.5em;font-weight:700;margin-bottom:16px;margin-top:24px;line-height:1.25;",
  h3: "font-size:1.25em;font-weight:700;margin-bottom:16px;margin-top:24px;line-height:1.25;",
  h4: "font-size:1em;font-weight:700;margin-bottom:16px;margin-top:24px;line-height:1.25;",
  p: "margin-bottom:16px;margin-top:0;line-height:1.6;",
  ul: "padding-left:2em;margin-bottom:16px;margin-top:0;list-style-type:disc;",
  ol: "padding-left:2em;margin-bottom:16px;margin-top:0;list-style-type:decimal;",
  li: "margin-bottom:4px;line-height:1.6;",
  blockquote:
    "border-left:4px solid #dfe2e5;padding:0 16px;color:#6a737d;margin:0 0 16px 0;",
  table:
    "border-collapse:collapse;margin-bottom:16px;width:100%;border-spacing:0;",
  thead: "",
  tbody: "",
  th: "background-color:#f6f8fa;border:1px solid #d0d7de;padding:8px 12px;font-weight:700;text-align:left;",
  td: "border:1px solid #d0d7de;padding:8px 12px;",
  tr: "",
  pre: "background:#f6f8fa;padding:16px;border-radius:6px;overflow-x:auto;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;font-size:14px;line-height:1.45;margin-bottom:16px;",
  code: "background-color:#f1f3f5;padding:3px 6px;border-radius:4px;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;font-size:85%;color:#e45735;",
  a: "color:#0969da;text-decoration:underline;",
  strong: "font-weight:700;",
  em: "font-style:italic;",
  del: "text-decoration:line-through;",
  img: "max-width:100%;height:auto;",
};

// pre > code should not have inline-code styles
const preCodeStyles =
  "background:none;padding:0;border-radius:0;font-family:inherit;font-size:inherit;";

// Tistory heading tag mapping: markdown h1→h2, h2→h3, h3→h4, h4+→h4
const tistoryHeadingMap: Record<string, { tag: string; size: string }> = {
  h1: { tag: "h2", size: "size26" },
  h2: { tag: "h3", size: "size23" },
  h3: { tag: "h4", size: "size20" },
  h4: { tag: "h4", size: "size20" },
  h5: { tag: "h4", size: "size20" },
  h6: { tag: "h4", size: "size20" },
};

const hljsClassStyles: Record<string, string> = {
  "hljs-keyword": "color:#cf222e;font-weight:bold;",
  "hljs-built_in": "color:#953800;",
  "hljs-type": "color:#953800;",
  "hljs-literal": "color:#0550ae;",
  "hljs-number": "color:#0550ae;",
  "hljs-operator": "color:#24292f;",
  "hljs-punctuation": "color:#24292f;",
  "hljs-property": "color:#0550ae;",
  "hljs-regexp": "color:#116329;",
  "hljs-string": "color:#0a3069;",
  "hljs-char.escape_": "color:#0a3069;",
  "hljs-subst": "color:#24292f;",
  "hljs-symbol": "color:#8250df;",
  "hljs-class": "color:#953800;",
  "hljs-function": "color:#8250df;",
  "hljs-title": "color:#8250df;",
  "hljs-title.class_": "color:#953800;",
  "hljs-title.class_.inherited__": "color:#953800;",
  "hljs-title.function_": "color:#8250df;",
  "hljs-params": "color:#24292f;",
  "hljs-comment": "color:#6e7781;font-style:italic;",
  "hljs-doctag": "color:#cf222e;",
  "hljs-meta": "color:#0550ae;",
  "hljs-meta .hljs-keyword": "color:#cf222e;",
  "hljs-meta .hljs-string": "color:#0a3069;",
  "hljs-attr": "color:#0550ae;",
  "hljs-attribute": "color:#116329;",
  "hljs-name": "color:#116329;",
  "hljs-tag": "color:#116329;",
  "hljs-selector-tag": "color:#116329;",
  "hljs-selector-class": "color:#953800;",
  "hljs-selector-id": "color:#8250df;",
  "hljs-selector-attr": "color:#0550ae;",
  "hljs-selector-pseudo": "color:#0550ae;",
  "hljs-variable": "color:#953800;",
  "hljs-template-variable": "color:#953800;",
  "hljs-template-tag": "color:#8250df;",
  "hljs-addition": "color:#116329;background:#dafbe1;",
  "hljs-deletion": "color:#82071e;background:#ffebe9;",
  "hljs-section": "color:#0550ae;font-weight:bold;",
  "hljs-bullet": "color:#953800;",
  "hljs-emphasis": "font-style:italic;",
  "hljs-strong": "font-weight:bold;",
  "hljs-formula": "color:#0a3069;",
  "hljs-link": "color:#0a3069;text-decoration:underline;",
  "hljs-quote": "color:#6e7781;",
};

function applyHljsStyles(element: Element): void {
  const classList = Array.from(element.classList);
  const matchedStyles: string[] = [];

  for (const cls of classList) {
    const style = hljsClassStyles[cls];
    if (style) {
      matchedStyles.push(style);
    }
  }

  if (matchedStyles.length > 0) {
    const existing = element.getAttribute("style") || "";
    element.setAttribute(
      "style",
      existing + matchedStyles.join(""),
    );
  }
}

function convertHeadings(doc: Document): void {
  // Convert headings in reverse order (h6→h4, ..., h1→h2) to avoid conflicts
  const headingTags = ["h6", "h5", "h4", "h3", "h2", "h1"];
  for (const tag of headingTags) {
    const elements = Array.from(doc.querySelectorAll(tag));
    for (const el of elements) {
      const mapping = tistoryHeadingMap[tag];
      if (!mapping) continue;

      const newEl = doc.createElement(mapping.tag);
      newEl.innerHTML = el.innerHTML;
      newEl.setAttribute("data-ke-size", mapping.size);

      // Copy existing attributes except style
      for (const attr of Array.from(el.attributes)) {
        if (attr.name !== "style") {
          newEl.setAttribute(attr.name, attr.value);
        }
      }

      el.parentNode?.replaceChild(newEl, el);
    }
  }
}

function convertHorizontalRules(doc: Document): void {
  const hrs = Array.from(doc.querySelectorAll("hr"));
  for (const hr of hrs) {
    hr.setAttribute("contenteditable", "false");
    hr.setAttribute("data-ke-type", "horizontalRule");
    hr.setAttribute("data-ke-style", "style6");
    hr.setAttribute("style", "border:none;border-top:1px solid #d0d7de;margin:24px 0;display:block;width:100%;");
  }
}

function convertBlockquotes(doc: Document): void {
  const blockquotes = Array.from(doc.querySelectorAll("blockquote"));
  for (const bq of blockquotes) {
    bq.setAttribute("data-ke-style", "style2");
  }
}

function convertInlineCode(doc: Document): void {
  // Convert inline <code> (not inside <pre>) to <span> for Tistory compatibility
  const codes = Array.from(doc.querySelectorAll("code"));
  for (const code of codes) {
    if (code.parentElement?.tagName.toLowerCase() === "pre") continue;

    const span = doc.createElement("span");
    span.innerHTML = code.innerHTML;
    span.setAttribute("style",
      "background-color:#f1f3f5;padding:3px 6px;border-radius:4px;" +
      "font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;" +
      "font-size:85%;color:#e45735;"
    );
    code.parentNode?.replaceChild(span, code);
  }
}

function splitBrIntoLines(html: string): string {
  // Replace <br> inside <p> with </p><p> for Tistory compatibility
  // Tistory ignores <br> and only recognizes <p> for line breaks
  // Line-break <p> gets margin:0 to distinguish from paragraph breaks
  return html.replace(
    /(<p[^>]*>)([\s\S]*?)(<\/p>)/g,
    (_match, openTag, content, closeTag) => {
      if (!/<br\s*\/?>/i.test(content)) return _match;
      const parts = content.split(/<br\s*\/?>/i);
      return parts
        .map((part: string, idx: number) => {
          const trimmed = part.trim();
          if (trimmed === "") return "";
          if (idx === 0) return `${openTag}${trimmed}${closeTag}`;
          return `<p style="margin:0;line-height:1.6;">${trimmed}</p>`;
        })
        .filter(Boolean)
        .join("");
    }
  );
}

function unwrapTheadTbody(doc: Document): void {
  // Remove thead/tbody wrappers — Tistory doesn't handle them properly.
  // Move their child <tr> elements directly under <table>.
  const wrappers = Array.from(doc.querySelectorAll("thead, tbody"));
  for (const wrapper of wrappers) {
    const parent = wrapper.parentNode;
    if (!parent) continue;
    while (wrapper.firstChild) {
      parent.insertBefore(wrapper.firstChild, wrapper);
    }
    parent.removeChild(wrapper);
  }
}


export function applyInlineStyles(html: string): string {
  if (typeof window === "undefined") {
    return html;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // 1. Convert headings to Tistory format (h1→h2, h2→h3, h3→h4)
  convertHeadings(doc);

  // 2. Unwrap thead/tbody for Tistory compatibility
  unwrapTheadTbody(doc);

  // 3. Convert HR to Tistory format
  convertHorizontalRules(doc);

  // 4. Convert blockquotes for Tistory
  convertBlockquotes(doc);

  // 5. Convert inline code to span for Tistory
  convertInlineCode(doc);

  // 6. Apply inline styles to all elements
  const allElements = doc.body.querySelectorAll("*");
  allElements.forEach((element) => {
    const tag = element.tagName.toLowerCase();
    const isInsidePre =
      tag === "code" &&
      element.parentElement?.tagName.toLowerCase() === "pre";

    if (isInsidePre) {
      element.setAttribute("style", preCodeStyles);
    } else if (elementStyles[tag] !== undefined) {
      const existing = element.getAttribute("style") || "";
      element.setAttribute("style", existing + elementStyles[tag]);
    }

    applyHljsStyles(element);
  });

  // 7. Split <br> in <p> into separate lines for Tistory
  let result = doc.body.innerHTML;
  result = splitBrIntoLines(result);

  return result;
}
