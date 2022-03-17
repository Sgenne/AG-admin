import Image from "./Image.interface";

export default interface ImageCategory {
  _id: string;
  title: string;
  previewImage: Image;
}
