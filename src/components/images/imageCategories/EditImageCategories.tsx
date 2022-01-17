import "../../../css/images/imageCategories/EditImageCategories.css";
import { IImage, IImageCategory } from "../../../interfaces/image";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import ImageCategoryItem from "./ImageCategoryItem";

interface IEditImageCategoriesProps {
  currentCategories: IImageCategory[];
  images: IImage[];
  newCategoryTitle: string;
  onNewCategorySubmit: () => void;
  onNewCategoryTitleChange: (newTitle: string) => void;
  onCategoryPreviewImageSubmit: (
    categoryId: string,
    previewImageId: string
  ) => void;
}

const EditImageCategories = (props: IEditImageCategoriesProps) => {
  // Create an ImageCategoryItem for each category with its current preview
  // image (if any), its title, and possible preview images.
  const currentCategoryItems = props.currentCategories.map((category) => (
    <li className="edit-image-categories__category-item" key={category._id}>
      <ImageCategoryItem
        category={category}
        currentPreviewImage={props.images.find(
          (image) => image._id === category.previewImage
        )}
        images={props.images.filter(
          (image) =>
            image.category.toLowerCase() === category.title.toLowerCase()
        )}
        onPreviewImageSubmit={props.onCategoryPreviewImageSubmit}
      />
    </li>
  ));

  return (
    <div className="edit-image-categories__page">
      <div className="edit-image-categories__new-category">
        <Input
          value={props.newCategoryTitle}
          onChange={props.onNewCategoryTitleChange}
        />
        <Button
          disabled={props.newCategoryTitle === ""}
          onClick={props.onNewCategorySubmit}
        >
          Lägg till kategori
        </Button>
      </div>
      <ul className="edit-image-categories__current-categories">
        {currentCategoryItems}
      </ul>
    </div>
  );
};

export default EditImageCategories;
