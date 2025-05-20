// composables/usePuzzleSections.js
import { ref } from 'vue'

export function usePuzzleSections(rows = 6, cols = 6, imgSize = 1740) {
  const gridSections = ref([])
  const containerRect = ref(null)

  const sectionSize = imgSize / cols // Assuming square

  function updateSectionsFromElement(el) {
    if (!el) return

    const rect = el.getBoundingClientRect()
    containerRect.value = rect

    const sections = []

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = rect.left + col * (rect.width / cols)
        const y = rect.top + row * (rect.height / rows)
        const width = rect.width / cols
        const height = rect.height / rows

        sections.push({
          index: row * cols + col,
          row,
          col,
          x,
          y,
          width,
          height,
        })
      }
    }

    gridSections.value = sections
  }

  function getSectionFromScreenPoint(screenX, screenY) {
    return gridSections.value.find(
      (section) =>
        screenX >= section.x &&
        screenX < section.x + section.width &&
        screenY >= section.y &&
        screenY < section.y + section.height,
    )
  }

  return {
    gridSections,
    updateSectionsFromElement,
    getSectionFromScreenPoint,
    containerRect,
  }
}
