function replaceWithNbsp(text: string): string {
  return text.replace(/(\s|^)([а-яА-ЯёЁ]{1,2})\s(?=\S)/g, '$1$2\u00A0')
}

export default {
  mounted(el: HTMLElement, binding: any) {
    if (binding.value === false) return

    const apply = () => {
      const updated = replaceWithNbsp(el.innerText)
      el.innerHTML = updated
    }

    apply()
  },
}
