export function getServerImageUrl(url: string) {
  return `${import.meta.env.VITE_API_URL}${url}`
}
