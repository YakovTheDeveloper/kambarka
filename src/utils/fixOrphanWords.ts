export function fixOrphanWordsInHTML(html: string): string {
  if (!html) return ''
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const walk = (node: Node) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        child.textContent = fixOrphanWords(child.textContent || '')
      } else {
        walk(child)
      }
    })
  }

  walk(doc.body)
  return doc.body.innerHTML
}

/**
 * Replaces spaces after short Russian words (1–2 letters) with non-breaking spaces.
 * Prevents "висячие" предлоги и союзы at line breaks.
 */
export function fixOrphanWords(text: string): string {
  if (!text) return ''
  return text.replace(/(\s|^)([а-яА-ЯёЁ]{1,2})\s(?=\S)/g, '$1$2\u00A0')
}
