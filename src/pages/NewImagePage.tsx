import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import NewImage from "../components/images/NewImage";
import { getGalleryCategories, uploadImage } from "../utils/backendUtils";
import { IImageCategory } from "../interfaces/image";
import { IStoreState } from "../store/store";

const NewImagePage = () => {
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [chosenCategory, setChosenCategory] = useState<string>();
  const [chosenImage, setChosenImage] = useState<File>();

  const authState = useSelector((state: IStoreState) => state.auth);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getGalleryCategories();
      setAvailableCategories(
        result.categories.map((category: IImageCategory) => category.title)
      );
    };
    fetchCategories();
  }, []);

  const categoryChangeHandler = (newValue: string) => {
    setChosenCategory(newValue);
  };

  const fileChangeHandler = (file: File) => {
    setChosenImage(file);
  };

  const submitHandler = () => {
    const userId = authState.userId;
    const accessToken = authState.accessToken;

    if (!(userId && accessToken)) return;

    if (!(chosenCategory && chosenImage)) return; // should also disable button if this is true

    uploadImage(chosenImage, chosenCategory, userId, accessToken);
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
