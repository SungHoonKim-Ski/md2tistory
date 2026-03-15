export async function copyRichText(html: string): Promise<boolean> {
  try {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof ClipboardItem !== "undefined"
    ) {
      const blob = new Blob([html], { type: "text/html" });
      const item = new ClipboardItem({ "text/html": blob });
      await navigator.clipboard.write([item]);
      return true;
    }

    // Fallback for older browsers using execCommand
    const div = document.createElement("div");
    div.innerHTML = html;
    div.style.position = "fixed";
    div.style.left = "-9999px";
    div.style.top = "-9999px";
    div.style.opacity = "0";
    document.body.appendChild(div);

    const selection = window.getSelection();
    if (!selection) {
      document.body.removeChild(div);
      return false;
    }

    const range = document.createRange();
    range.selectNodeContents(div);
    selection.removeAllRanges();
    selection.addRange(range);

    const success = document.execCommand("copy");
    selection.removeAllRanges();
    document.body.removeChild(div);
    return success;
  } catch {
    return false;
  }
}
