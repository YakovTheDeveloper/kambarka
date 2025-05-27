/**
 * Returns the media category ('image', 'video', 'document') based on file extension.
 * @param url - The media URL
 * @returns 'image' | 'video' | 'document' | 'unknown'
 */
export function getMediaCategory(url: string): 'image' | 'video' | 'document' | 'unknown' {
    const extension = url.split('.').pop()?.toLowerCase();

    if (!extension) return 'unknown';

    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'ico'];
    const videoExtensions = ['mp4', 'webm', 'ogv', 'mov', 'avi'];
    const documentExtensions = ['pdf', 'txt', 'json', 'html', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];

    if (imageExtensions.includes(extension)) return 'image';
    if (videoExtensions.includes(extension)) return 'video';
    if (documentExtensions.includes(extension)) return 'document';

    return 'unknown';
}
