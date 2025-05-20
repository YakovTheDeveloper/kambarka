import { ref, type Ref } from 'vue'

type Args = {
  items: Ref<{ x: number; y: number }[]>
  onDragEndAction?: (draggingIndex: Ref<number>, item: any) => void
}

export const useMovable = (args: Args) => {
  const draggingIndex = ref<number | null>(null)
  const offset = ref({ x: 0, y: 0 })
  const currentPos = ref({ x: 0, y: 0 })

  function getEventPosition(event: TouchEvent | MouseEvent) {
    if ('touches' in event) {
      const touch = event.touches[0]
      return { x: touch.clientX, y: touch.clientY }
    } else {
      return { x: event.clientX, y: event.clientY }
    }
  }

  function startDrag(index: number, event: TouchEvent | MouseEvent) {
    draggingIndex.value = index
    const pos = getEventPosition(event)
    const item = args.items.value[index]
    offset.value.x = pos.x - item.x
    offset.value.y = pos.y - item.y
  }

  function onDrag(event: TouchEvent | MouseEvent) {
    if (draggingIndex.value === null) return
    const pos = getEventPosition(event)
    const item = args.items.value[draggingIndex.value]
    item.x = pos.x - offset.value.x
    item.y = pos.y - offset.value.y
    currentPos.value = pos
  }

  function endDrag() {
    if (draggingIndex.value !== null) {
      const droppedItem = args.items.value[draggingIndex.value]

      args.onDragEndAction?.(draggingIndex, droppedItem)
    }
    draggingIndex.value = null
  }

  return {
    startDrag,
    onDrag,
    endDrag,
  }
}
