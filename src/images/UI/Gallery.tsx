import "../CSS/Gallery.css";
import ImageOverview from "./ImageOverview";
import Button from "../../common/UI/Button";
import Select from "../../common/UI/Select";
import Image from "../../interfaces/Image.interface"

interface IGalleryProps {
  images: Image[];
  onImageClicked: (image: Image) => void;
  onNewImageButtonClicked: () => void;
  availableCategories: string[];
  onCategoryChange: (newCategory: string) => void;
  onEditCategoriesButtonClicked: () => void;
}

const Gallery = ({
  images,
  onImageClicked,
  onNewImageButtonClicked,
  availableCategories,
  onCategoryChange,
  onEditCategoriesButtonClicked,
}: IGalleryProps) => {
  const categoryOptions = availableCategories.map((category) => ({
    text: category,
    value: category,
  }));

  return (
    <div className="gallery">
      <div className="gallery__control">
        <div className="gallery__filter">
          <Select
            label="Välj kategori"
            options={categoryOptions}
            onChange={onCategoryChange}
          />
        </div>
        <div className="gallery__edit">
          <Button onClick={onNewImageButtonClicked}>Ny bild</Button>
          <Button onClick={onEditCategoriesButtonClicked}>
            Redigera kategorier
          </Button>
        </div>
      </div>

      <ImageOverview images={images} onImageClicked={onImageClicked} />
    </div>
  );
};

export default Gallery;
