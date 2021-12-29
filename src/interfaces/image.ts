export interface IImage {
  _id: string;
  imageUrl: string;
  compressedImageUrl: string;
  category: string;
  createdAt: Date | string;
}
