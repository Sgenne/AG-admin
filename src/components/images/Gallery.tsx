import "../../css/images/Gallery.css";
import { IImage } from "../../interfaces/image";
import ImageOverview from "./ImageOverview";
import Button from "./../UI/Button";
import Select from "./../UI/Select";

interface IGalleryProps {
  images: IImage[] | undefined;
  onImageClick: (image: IImage) => void;
  onNewImageButtonClicked: () => void;
  availableCategories: string[];
  onCategoryChange: (newCategory: string) => void;
}

const Gallery = ({
  images,
  onImageClick,
  onNewImageButtonClicked,
  availableCategories,
  onCategoryChange,
}: IGalleryProps) => {
  return (
    <div className="gallery">
      <div className="gallery__control">
        <div className="gallery__control__filter">
          <Select
            label="Välj kategori"
            options={availableCategories}
            onChange={onCategoryChange}
          />
        </div>
        <div className="gallery__control__edit">
          <Button onClick={onNewImageButtonClicked}>Ny bild</Button>
        </div>
      </div>

      <ImageOverview images={images} onImageClick={onImageClick} />
    </div>
  );
};

export default Gallery;
