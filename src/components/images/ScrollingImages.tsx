import { IImage } from "../../interfaces/image";

interface IScrollingImagesProps {
  images: IImage[];
  onImageClicked: (image: IImage) => void;
  onSubmitChanges: () => void;
}

const ScrollingImages = ({
  images,
  onImageClicked,
  onSubmitChanges,
}: IScrollingImagesProps) => {
  return <div></div>;
};

export default ScrollingImages;
