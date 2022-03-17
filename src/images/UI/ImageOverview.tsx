import "../CSS/ImageOverview.css";
import IPreviewImage from "../../interfaces/PreviewImage.interface";
import PreviewImage from "./PreviewImage";

interface IImageOverviewProps {
  images: IPreviewImage[];
  onImageClicked: (image: IPreviewImage) => void;
}

const ImageOverview = ({ images, onImageClicked }: IImageOverviewProps) => {
  const imageContent = images.map((image) => (
    <span className="image-overview__image-container" key={image._id}>
      <PreviewImage
        src={image.compressedImageUrl}
        onClick={() => onImageClicked(image)}
        greenBorder={image.highlight}
        coverText={image.text}
      />
    </span>
  ));

  return <div className="image-overview__images">{imageContent}</div>;
};

export default ImageOverview;
