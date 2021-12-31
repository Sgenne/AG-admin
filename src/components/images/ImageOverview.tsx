import "../../css/images/ImageOverview.css";
import { IImage } from "../../interfaces/image";

interface IImageOverviewProps {
  images: IImage[] | undefined;
  onImageClick: (image: IImage) => void;
}

const ImageOverview = ({ images, onImageClick }: IImageOverviewProps) => {
  if (!images) {
    return <></>;
  }

  const imageContent = images.map((image) => (
    <span className="image-overview__image-container" key={image._id}>
      <img
        className="image-overview__image"
        src={image.compressedImageUrl}
        alt=""
        onClick={() => onImageClick(image)}
      />
    </span>
  ));

  return <div className="image-overview__images">{imageContent}</div>;
};

export default ImageOverview;
