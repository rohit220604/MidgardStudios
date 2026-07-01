export interface GalleryItem {
  id: string;
  imageUrl: string;
  prompt: string;
  genre: string;
  environment: string;
  style: string;
  createdAt: string;
}

export type GalleryResponse = GalleryItem[];
