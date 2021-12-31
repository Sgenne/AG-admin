import React, { ChangeEvent } from "react";
import "../../css/images/SingleImage.css";
import { IImage } from "../../interfaces/image";

interface ISingleImage {
  image: IImage | undefined;
  categories: string[] | undefined;
  disableSubmitCategoryChangeButton: boolean;
  onCategoryChanged: (newCategory: string) => void;
  onSubmitCategoryChange: () => void;
}

const SingleImage = ({
  image,
  categories,
  disableSubmitCategoryChangeButton,
  onCategoryChanged,
  onSubmitCategoryChange,
}: ISingleImage) => {
  const categoryOptions = categories
    ? categories.map((category) => <option key={category}>{category}</option>)
    : [];

  const changedCategoryOptionHandler = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    if (!event.target) return;

    onCategoryChanged(event.target.value);
  };

  return (
    <div className="single-image__page flex-row jc-space-between">
      <div className="single-image__left">
        <div className="single-image__image-container">
          {image && (
            <img className="single-image__image" src={image.imageUrl} alt="" />
          )}
        </div>
      </div>
      <div className="single-image__control">
        <select
          className="single-image__category-options"
          onChange={changedCategoryOptionHandler}
        >
          {categoryOptions}
        </select>
        <button disabled={disableSubmitCategoryChangeButton}>
          Uppdatera kategori
        </button>
      </div>
    </div>
  );
};

export default SingleImage;
