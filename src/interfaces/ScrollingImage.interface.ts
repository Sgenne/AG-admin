import Image from "./Image.interface";

export default interface ScrollingImage {
  _id: string;
  image: Image;
  order: number;
}
