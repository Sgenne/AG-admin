import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Gallery from "../UI/Gallery";

import { getAllGalleryImages } from "../../utils/backendUtils";
import ImageCategory from "../../interfaces/ImageCategory.interface";
import Image from "../../interfaces/Image.interface";

const GalleryPage = () => {
  // The displayed images.
  const [images, setImages] = useState<Image[]>([]);

  // The categories the user can filter the images by.
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  // The currently chosen category. The images will only be filtered if the
  // category is in availableCategories.
  const [chosenCategory, setChosenCategory] = useState<string>("");

  const navigate = useNavigate();

  // fetch images from backend when page is loaded
  useEffect(() => {
    const fetchImages = async () => {
      const result = await getAllGalleryImages();
      setImages(result.images);

      // The available image categories.
      const availableCategories: string[] = result.categories.map(
        (category: ImageCategory) => category.title
      );

      setAvailableCategories(availableCategories);
    };
    fetchImages();
  }, []);

  // Handles clicks on any of the displayed images.
  const imageClickHandler = (image: Image) => {
    navigate(`/bilder/${image._id}`);
  };

  // Handles clicks on the "new image" button.
  const newImageButtonHandler = () => {
    navigate("/ny-bild");
  };

  const editCategoriesButtonHandler = () => {
    navigate("/bilder/redigera-kategorier");
  };

  // Handles a new image category being chosen.
  const categoryChangeHandler = (newCategory: string) => {
    if (!availableCategories.includes(newCategory)) {
      setChosenCategory("");
      return;
    }

    setChosenCategory(newCategory);
  };

  // If a category has been chosen, only show the images from that category.
  const filteredImages = chosenCategory
    ? images.filter((image) => image.category === chosenCategory.toLowerCase())
    : images;

  // The list of category options that will be given to the user.
  const categoryOptions = availableCategories.concat("Alla kategorier");

  return (
    <Gallery
      images={filteredImages}
      onImageClicked={imageClickHandler}
      onNewImageButtonClicked={newImageButtonHandler}
      availableCategories={categoryOptions}
      onCategoryChange={categoryChangeHandler}
      onEditCategoriesButtonClicked={editCategoriesButtonHandler}
    />
  );
};

export default GalleryPage;
