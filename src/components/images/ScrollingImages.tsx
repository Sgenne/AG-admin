import { IImage } from "../../interfaces/image";
import ImageOverview from "./ImageOverview";
import "../../css/images/ScrollingImages.css";
import Button from "../UI/Button";
import MessagePopup from "../UI/MessagePopup";

interface IScrollingImagesProps {
  images: IImage[];
  onImageClicked: (image: IImage) => void;
  onSubmitChanges: () => void;
  successfullyUpdated?: boolean;
  message?: string;
}

const ScrollingImages = ({
  images,
  onImageClicked,
  onSubmitChanges,
  successfullyUpdated = false,
  message = "",
}: IScrollingImagesProps) => {
  return (
    <div>
      <MessagePopup message={message} success={successfullyUpdated} />
      <div className="scrolling-images__head">
        <Button onClick={onSubmitChanges}>Uppdatera framsida</Button>
      </div>
      <ImageOverview images={images} onImageClicked={onImageClicked} />;
    </div>
  );
};

export default ScrollingImages;
