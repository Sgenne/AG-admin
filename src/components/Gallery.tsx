import "../css/Gallery.css";
import { IImage } from "../interfaces/image";
import ImageOverview from "./images/ImageOverview";

interface IGalleryProps {
  images: IImage[] | undefined;
}

const Gallery = ({ images }: IGalleryProps) => {
  return (
    <div className="gallery">
      <ImageOverview images={images} />
    </div>
  );
};

export default Gallery;
