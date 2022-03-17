import Image from "./Image.interface";

/*
TODO
=======
Have property Image instead of superclass.
*/

export default interface IPreviewImage extends Image {
  highlight?: boolean;
  text?: string;
}
