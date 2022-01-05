import "../../css/images/SingleImage.css";
import { IImage } from "../../interfaces/image";
import Button from "../UI/Button";

interface ISingleImage {
  image: IImage | undefined;
  onDeleteImage: () => void;
}

const SingleImage = ({ image, onDeleteImage }: ISingleImage) => {
  return (
    <div className="single-image__page flex-row jc-space-between">
      <div className="single-image__left">
        <div className="single-image__image-container">
          {image && (
            <img className="single-image__image" src={image.imageUrl} alt="" />
          )}
        </div>
      </div>
      <div className="single-image__control">
        <div>
          <Button onClick={onDeleteImage} type="submit" salmonHover>
            Ta bort bild
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleImage;
