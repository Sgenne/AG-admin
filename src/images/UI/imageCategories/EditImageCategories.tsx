import "../../CSS/imageCategories/EditImageCategories.css";
import Button from "../../../common/UI/Button";
import Input from "../../../common/UI/Input";
import ImageCategoryItem from "./ImageCategoryItem";
import ImageCategory from "../../../interfaces/ImageCategory.interface";
import Image from "../../../interfaces/Image.interface";

interface IEditImageCategoriesProps {
  currentCategories: ImageCategory[];
  images: Image[];
  newCategoryTitle: string;
  onNewCategorySubmit: () => void;
  onNewCategoryTitleChange: (newTitle: string) => void;
  onCategoryPreviewImageSubmit: (
    categoryId: string,
    previewImageId: string
  ) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const EditImageCategories = (props: IEditImageCategoriesProps) => {
  // Create an ImageCategoryItem for each category with its current preview
  // image (if any), its title, and possible preview images.
  const currentCategoryItems = props.currentCategories.map((category) => (
    <li className="edit-image-categories__category-item" key={category._id}>
      <ImageCategoryItem
        category={category}
        currentPreviewImage={category.previewImage}
        images={props.images.filter(
          (image) =>
            image.category.toLowerCase() === category.title.toLowerCase()
        )}
        onPreviewImageSubmit={props.onCategoryPreviewImageSubmit}
        onDelete={() => props.onDeleteCategory(category._id)}
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
