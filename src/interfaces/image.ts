export interface IImage {
  _id: string;
  imageUrl: string;
  compressedImageUrl: string;
  category: string;
  createdAt: Date | string;
}

export interface IImageCategory {
  _id: string;
  title: string;
  previewImage: string;
}
