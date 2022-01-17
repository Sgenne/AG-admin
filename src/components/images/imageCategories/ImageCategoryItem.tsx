import { useState } from "react";
import "../../../css/images/imageCategories/ImageCategoryItem.css";
import { IImage, IImageCategory } from "../../../interfaces/image";
import Button from "../../UI/Button";
import Select from "../../UI/Select";

interface IImageCategoryItemProps {
  currentPreviewImage?: IImage;
  category: IImageCategory;
  images: IImage[];
  onPreviewImageSubmit: (categoryId: string, newPreviewImageId: string) => void;
}

const ImageCategoryItem = ({
  currentPreviewImage,
  category,
  images,
  onPreviewImageSubmit,
}: IImageCategoryItemProps) => {
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
    text: image.imageUrl,
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
      <h2>{category.title}</h2>
      <Select
        options={dropdownOptions}
        onChange={selectedPreviewImageChangeHandler}
        label="Välj exempelbild"
      />
      <Button
        disabled={!selectedPreviewImageId}
        onClick={submitPreviewImageHandler}
      >
        Uppdatera exempelbild
      </Button>
    </div>
  );
};

export default ImageCategoryItem;
