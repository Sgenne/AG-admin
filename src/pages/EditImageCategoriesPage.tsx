import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import EditImageCategories from "../components/images/imageCategories/EditImageCategories";
import { IImage, IImageCategory } from "../interfaces/image";
import { IStoreState } from "../store/store";
import {
  addImageCategory,
  getAllGalleryImages,
  setImageCategoryPreviewImage,
} from "../utils/backendUtils";

const EditImageCategoriesPage = () => {
  // The image categories at the time of loading the page.
  const [currentCategories, setCurrentCategories] = useState<IImageCategory[]>(
    []
  );

  // All gallery images.
  const [images, setImages] = useState<IImage[]>([]);

  // The currently entered new category title.
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const { userId, accessToken } = useSelector(
    (state: IStoreState) => state.auth
  );

  const navigate = useNavigate();

  if (!(userId && accessToken))
    throw new Error("Invalid user-id and access-token.");

  // Fetch image categories from backend when page is loaded.
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllGalleryImages();
      if (result.status !== 200) {
        const error = new Error(result.message);
        throw error;
      }

      console.log("result: ", result.images);
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
    const result = await addImageCategory(
      newCategoryTitle,
      userId,
      accessToken
    );

    if (result.status !== 200) {
      throw new Error(result.message);
    }

    navigate("/bilder");
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
      userId,
      accessToken
    );

    if (result.status !== 200) {
      throw new Error(result.message);
    }

    // Replace the category object of the affected category with a new object containing the
    // new preview image.
    setCurrentCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === categoryId ? result.category : category
      )
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
    />
  );
};

export default EditImageCategoriesPage;
