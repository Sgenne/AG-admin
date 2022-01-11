import { IImage } from "../../interfaces/image";
import ImageOverview from "./ImageOverview";
import "../../css/images/ScrollingImages.css";
import Button from "../UI/Button";

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
  return (
    <div>
      <div className="scrolling-images__head">
        <Button onClick={onSubmitChanges}>Uppdatera framsida</Button>
      </div>
      <ImageOverview images={images} onImageClicked={onImageClicked} />;
    </div>
  );
};

export default ScrollingImages;
