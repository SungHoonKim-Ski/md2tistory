const elementStyles: Record<string, string> = {
  h1: "font-size:2em;font-weight:700;margin-bottom:16px;margin-top:24px;line-height:1.25;",
  h2: "font-size:1.5em;font-weight:700;margin-bottom:16px;margin-top:24px;line-height:1.25;border-bottom:1px solid #d0d7de;padding-bottom:0.3em;",
  h3: "font-size:1.25em;font-weight:700;margin-bottom:16px;margin-top:24px;line-height:1.25;",
  h4: "font-size:1em;font-weight:700;margin-bottom:16px;margin-top:24px;line-height:1.25;",
  h5: "font-size:0.875em;font-weight:700;margin-bottom:16px;margin-top:24px;line-height:1.25;",
  h6: "font-size:0.85em;font-weight:700;margin-bottom:16px;margin-top:24px;line-height:1.25;color:#656d76;",
  p: "margin-bottom:16px;margin-top:0;line-height:1.6;",
  ul: "padding-left:2em;margin-bottom:16px;margin-top:0;list-style-type:disc;",
  ol: "padding-left:2em;margin-bottom:16px;margin-top:0;list-style-type:decimal;",
  li: "margin-bottom:4px;line-height:1.6;",
  blockquote:
    "border-left:4px solid #dfe2e5;padding:0 16px;color:#6a737d;margin:0 0 16px 0;",
  table:
    "border-collapse:collapse;margin-bottom:16px;width:100%;overflow:auto;display:block;",
  th: "background:#f6f8fa;border:1px solid #d0d7de;padding:8px 12px;font-weight:700;text-align:left;",
  td: "border:1px solid #d0d7de;padding:8px 12px;",
  tr: "",
  pre: "background:#f6f8fa;padding:16px;border-radius:6px;overflow-x:auto;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;font-size:14px;line-height:1.45;margin-bottom:16px;",
  code: "background:#f0f0f0;padding:2px 6px;border-radius:3px;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;font-size:85%;",
  a: "color:#0969da;text-decoration:underline;",
  strong: "font-weight:700;",
  em: "font-style:italic;",
  del: "text-decoration:line-through;",
  hr: "border:none;border-top:1px solid #d0d7de;margin:24px 0;",
  img: "max-width:100%;height:auto;",
};

// pre > code should not have inline-code styles
const preCodeStyles =
  "background:none;padding:0;border-radius:0;font-family:inherit;font-size:inherit;";

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

export function applyInlineStyles(html: string): string {
  if (typeof window === "undefined") {
    return html;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const allElements = doc.body.querySelectorAll("*");

  allElements.forEach((element) => {
    const tag = element.tagName.toLowerCase();
    const isInsidePre =
      element.tagName.toLowerCase() === "code" &&
      element.parentElement?.tagName.toLowerCase() === "pre";

    if (isInsidePre) {
      element.setAttribute("style", preCodeStyles);
    } else if (elementStyles[tag] !== undefined) {
      const existing = element.getAttribute("style") || "";
      element.setAttribute("style", existing + elementStyles[tag]);
    }

    applyHljsStyles(element);
  });

  return doc.body.innerHTML;
}
