import { getServerImageUrl } from "@/utils/getServerImageUrl";

export const loadImages = (list: { image: string }[]) => {
    const promises = list.map(item => {
        return new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.src = getServerImageUrl(item.image);
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(`Failed to load image: ${item.image}`));
        });
    });

    return Promise.all(promises);
};