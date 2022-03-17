import { useState } from "react";
import "../../CSS/imageCategories/ImageCategoryItem.css";
import Button from "../../../common/UI/Button";
import Select from "../../../common/UI/Select";
import Image from "../../../interfaces/Image.interface";
import ImageCategory from "../../../interfaces/ImageCategory.interface"

interface ImageCategoryItemProps {
  currentPreviewImage?: Image;
  category: ImageCategory;
  images: Image[];
  onPreviewImageSubmit: (categoryId: string, newPreviewImageId: string) => void;
  onDelete: () => void;
}

const ImageCategoryItem = ({
  currentPreviewImage,
  category,
  images,
  onPreviewImageSubmit,
  onDelete,
}: ImageCategoryItemProps) => {
  const [selectedPreviewImageId, setSelectedPreviewImageId] =
    useState<string>("");

  // Handler for when the user clicks on a new image option in the dropdown.
  const selectedPreviewImageChangeHandler = (newPreviewImageId: string) => {
    setSelectedPreviewImageId(newPreviewImageId);
  };

  // Handler for when the user submits preview image change.
  const submitPreviewImageHandler = () => {
    onPreviewImageSubmit(category._id, selectedPreviewImageId);
  };

  const dropdownOptions = images.map((image) => ({
    text: image.filename,
    value: image._id,
  }));

  return (
    <div className="image-category-item">
      {currentPreviewImage ? (
        <span className="image-category-item__current-image">
          <img
            src={currentPreviewImage.compressedImageUrl}
            alt={currentPreviewImage.alt}
          />
        </span>
      ) : (
        <></>
      )}

      <span className="image-category-item__middle">
        <h2>{category.title}</h2>
        <Select
          options={dropdownOptions}
          onChange={selectedPreviewImageChangeHandler}
          label="Välj exempelbild"
        />
      </span>

      <span className="image-category-item__buttons">
        <Button
          disabled={!selectedPreviewImageId}
          onClick={submitPreviewImageHandler}
        >
          Uppdatera exempelbild
        </Button>
        <Button onClick={onDelete}>Ta bort kategori</Button>
      </span>
    </div>
  );
};

export default ImageCategoryItem;
