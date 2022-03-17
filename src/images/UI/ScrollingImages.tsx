import Image from "../../interfaces/Image.interface";
import ImageOverview from "./ImageOverview";
import "../CSS/ScrollingImages.css";
import Button from "../../common/UI/Button";
import MessagePopup from "../../common/UI/MessagePopup";

interface IScrollingImagesProps {
  images: Image[];
  onImageClicked: (image: Image) => void;
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
