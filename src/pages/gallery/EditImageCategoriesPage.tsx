import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import EditImageCategories from "../../components/images/imageCategories/EditImageCategories";
import { IImage, IImageCategory } from "../../interfaces/image";
import { IStoreState } from "../../store/store";
import {
  addImageCategory,
  deleteImageCategory,
  getAllGalleryImages,
  setImageCategoryPreviewImage,
} from "../../utils/backendUtils";
import { errorStatusCode } from "../../utils/utils";

const EditImageCategoriesPage = () => {
  // The image categories at the time of loading the page.
  const [currentCategories, setCurrentCategories] = useState<IImageCategory[]>(
    []
  );

  // All gallery images.
  const [images, setImages] = useState<IImage[]>([]);

  // The currently entered new category title.
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [error, setError] = useState<Error>();

  const { accessToken } = useSelector((state: IStoreState) => state.auth);

  if (!accessToken) throw new Error("Invalid access-token.");

  if (error) {
    throw error;
  }

  // Fetch image categories from backend when page is loaded.
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllGalleryImages();
      if (errorStatusCode(result.status)) {
        const error = new Error(result.message);
        throw error;
      }
      
      setCurrentCategories(result.categories);
      setImages(result.images);
    };
    fetchCategories();
  }, []);

  const newCategorySubmitHandler = async () => {
    // If the category title is empty or already exists.
    if (
      !newCategoryTitle ||
      currentCategories.some((category) => category.title === newCategoryTitle)
    ) {
      return; // Show error message
    }
    const result = await addImageCategory(newCategoryTitle, accessToken);

    if (errorStatusCode(result.status)) {
      setError(new Error(result.message));
    }

    setCurrentCategories((prevCategories) => [
      ...prevCategories,
      result.category,
    ]);
  };

  // Handler for when the user types into the category title input.
  const newCategoryTitleChangeHandler = (newTitle: string) => {
    setNewCategoryTitle(newTitle);
  };

  // Updates the preview image of the category with the given id
  // to the image with the given image-id.
  const categoryPreviewImageChangeHandler = async (
    categoryId: string,
    previewImageId: string
  ) => {
    if (!(categoryId && previewImageId)) return;

    const result = await setImageCategoryPreviewImage(
      previewImageId,
      categoryId,
      accessToken
    );

    if (errorStatusCode(result.status)) {
      setError(new Error(result.message));
    }

    // EditImageCategories component doesn't expect previewImage to be
    // populated. Only to contain the id of the previewImage.
    const updatedCategory = {
      ...result.category,
      previewImage: result.category.previewImage._id,
    };

    // Replace the category object of the affected category with a new object containing the
    // new preview image.
    setCurrentCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === categoryId ? updatedCategory : category
      )
    );
  };

  const deleteCategoryHandler = async (categoryId: string) => {
    const result: { status: number; message: string } =
      await deleteImageCategory(categoryId, accessToken);

    if (errorStatusCode(result.status)) {
      setError(new Error(result.message));
    }

    // Remove the category that was deleted from the backend from
    // the displayed categories.
    setCurrentCategories((prevCategories) =>
      prevCategories.filter((category) => category._id !== categoryId)
    );
  };

  return (
    <EditImageCategories
      currentCategories={currentCategories}
      images={images}
      onNewCategorySubmit={newCategorySubmitHandler}
      onNewCategoryTitleChange={newCategoryTitleChangeHandler}
      onCategoryPreviewImageSubmit={categoryPreviewImageChangeHandler}
      newCategoryTitle={newCategoryTitle}
      onDeleteCategory={deleteCategoryHandler}
    />
  );
};

export default EditImageCategoriesPage;
