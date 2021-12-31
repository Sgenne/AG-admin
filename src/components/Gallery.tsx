import "../css/Gallery.css";
import { IImage } from "../interfaces/image";
import ImageOverview from "./images/ImageOverview";

interface IGalleryProps {
  images: IImage[] | undefined;
  onImageClick: (image: IImage) => void;
}

const Gallery = ({ images, onImageClick }: IGalleryProps) => {
  return (
    <div className="gallery">
      <ImageOverview images={images} onImageClick={onImageClick} />
    </div>
  );
};

export default Gallery;
