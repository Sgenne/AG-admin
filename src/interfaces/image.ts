export interface IImage {
  _id: string;
  imageUrl: string;
  compressedImageUrl: string;
  category: string;
  createdAt: Date | string;
}

export interface IPreviewImage extends IImage {
  highlight?: boolean;
  text?: string;
}

export interface IScrollingImage {
  _id: string;
  image: IImage;
  order: number;
}

export interface IImageCategory {
  _id: string;
  title: string;
  previewImage: string;
}
