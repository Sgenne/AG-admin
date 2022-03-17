export default interface Image {
  _id: string;
  filename: string;
  imageUrl: string;
  compressedImageUrl: string;
  category: string;
  createdAt: Date | string;
  alt?: string;
}
