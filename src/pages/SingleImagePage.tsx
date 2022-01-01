import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { IImage, IImageCategory } from "../interfaces/image";
import useBackend from "../hooks/useBackend";
import SingleImage from "../components/images/SingleImage";

const SingleImagePage = () => {
  const [image, setImage] = useState<IImage>();
  const [availableCategories, setAvailableCategories] = useState<string[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const { getImageById, getGalleryCategories } = useBackend();

  const { imageId } = useParams();

  // fetch image when page is loaded
  useEffect(() => {
    const fetchImage = async () => {
      if (!imageId) return;
      const fetchResult = await getImageById(imageId);
      setImage(fetchResult.image);
      setSelectedCategory(fetchResult.image.category);
    };

    const fetchCategories = async () => {
      const fetchResult = await getGalleryCategories();

      const categoryStrings = fetchResult.categories.map(
        (category: IImageCategory) => category.title
      );

      setAvailableCategories(categoryStrings);
    };

    fetchImage();
    fetchCategories();
  }, [imageId, getImageById, getGalleryCategories]);

  const categoryOptionChangedHandler = (newCategory: string) => {
    if (!availableCategories) return;

    if (!availableCategories.includes(newCategory)) return;

    setSelectedCategory(newCategory);
  };

  const submitCategoryChangeHandler = () => {
    // implement after login is finished
  };

  const disableSubmitChangeButton = image
    ? image.category === selectedCategory
    : false;

  return (
    <SingleImage
      image={image}
      disableSubmitCategoryChangeButton={disableSubmitChangeButton}
      onCategoryChanged={categoryOptionChangedHandler}
      onSubmitCategoryChange={submitCategoryChangeHandler}
      categories={availableCategories}
    />
  );
};

export default SingleImagePage;
