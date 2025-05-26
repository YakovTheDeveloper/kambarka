export function getFileTypeFromUrl(url: string) {
  const extension = url.split('.').pop()?.toLowerCase() ?? ''

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp']
  const videoExtensions = ['mp4', 'webm', 'ogg', 'avi', 'mov', 'mkv']
  const documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt']

  if (imageExtensions.includes(extension)) {
    return 'image'
  } else if (videoExtensions.includes(extension)) {
    return 'video'
  } else if (documentExtensions.includes(extension)) {
    return 'document'
  } else {
    return 'unknown'
  }
}
