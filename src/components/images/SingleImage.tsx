import "../../css/images/SingleImage.css";
import { IImage } from "../../interfaces/image";
import Button from "../UI/Button";
import MessagePopup from "../UI/MessagePopup";

interface ISingleImage {
  image: IImage | undefined;
  onDeleteImage: () => void;
  hasError: boolean;
  message: string;
}

const SingleImage = ({
  image,
  onDeleteImage,
  hasError,
  message,
}: ISingleImage) => {
  return (
    <>
      <MessagePopup message={message} error={hasError} />
      <div className="single-image__page">
        <div className="single-image__left">
          <div className="single-image__image-container">
            {image && (
              <img
                className="single-image__image"
                src={image.imageUrl}
                alt=""
              />
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
    </>
  );
};

export default SingleImage;
