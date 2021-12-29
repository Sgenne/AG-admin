import "../../css/ImageOverview.css";
import { IImage } from "../../interfaces/image";

interface IImageOverviewProps {
  images: IImage[] | undefined;
}

const ImageOverview = ({ images }: IImageOverviewProps) => {
  if (!images) {
    return <></>;
  }

  const imageContent = images.map((image) => (
    <span className="image-overview__image-container" key={image._id}>
      <img
        className="image-overview__image"
        src={image.compressedImageUrl}
        alt=""
      />
    </span>
  ));

  return <div className="image-overview__images">{imageContent}</div>;
};

export default ImageOverview;
