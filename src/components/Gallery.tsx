import "../css/Gallery.css";
import { IImage } from "../interfaces/image";
import ImageOverview from "./images/ImageOverview";
import Button from "./UI/Button";

interface IGalleryProps {
  images: IImage[] | undefined;
  onImageClick: (image: IImage) => void;
  onNewImageButtonClicked: () => void;
}

const Gallery = ({ images, onImageClick, onNewImageButtonClicked }: IGalleryProps) => {
  return (
    <div className="gallery">
      <div className="gallery__control flex-row jc-end">
        <Button onClick={onNewImageButtonClicked}>Ny bild</Button>
      </div>
      <ImageOverview images={images} onImageClick={onImageClick} />
    </div>
  );
};

export default Gallery;
