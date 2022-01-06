import { useState, useEffect } from "react";
import NewImage from "../components/images/NewImage";
import useBackend from "../hooks/useBackend";

const NewImagePage = () => {
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [chosenCategory, setChosenCategory] = useState<string>();
  const [chosenImage, setChosenImage] = useState<File>();

  const { getGalleryCategories } = useBackend();

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getGalleryCategories();
      setAvailableCategories(result.categories);
    };
    fetchCategories();
  }, [getGalleryCategories]);

  const categoryChangeHandler = (newValue: string) => {
    setChosenCategory(newValue);
  };

  const fileChangeHandler = (file: File) => {
    setChosenImage(file);
  };

  const submitHandler = () => {
    if (!(chosenCategory && chosenImage)) return; // should also disable button if this is true

    // uploadImage()
  };

  return (
    <NewImage
      onCategoryChange={categoryChangeHandler}
      categories={availableCategories}
      onFileChange={fileChangeHandler}
      onSubmit={submitHandler}
    />
  );
};

export default NewImagePage;
