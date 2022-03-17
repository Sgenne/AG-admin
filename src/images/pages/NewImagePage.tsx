import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import NewImage from "../UI/NewImage";
import { getGalleryCategories, uploadImage } from "../../utils/backendUtils";
import ImageCategory from "../../interfaces/ImageCategory.interface";
import { IStoreState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { errorStatusCode } from "../../utils/utils";

const NewImagePage = () => {
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [chosenCategory, setChosenCategory] = useState<string>();
  const [chosenImage, setChosenImage] = useState<File>();
  const [hasError, setHasError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const authState = useSelector((state: IStoreState) => state.auth);
  const navigate = useNavigate();

  // Fetch available gallery categories once the component is loaded.
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getGalleryCategories();

      // Only the string value needs to be passed down to NewImage.
      setAvailableCategories(
        result.categories.map((category: ImageCategory) => category.title)
      );
    };
    fetchCategories();
  }, []);

  // Handles the category option changing.
  const categoryChangeHandler = (newValue: string) => {
    setChosenCategory(newValue);
  };

  // Handles the chosen file changing.
  const fileChangeHandler = (file: File) => {
    setChosenImage(file);
  };

  const disableSubmit = !(chosenCategory && chosenImage);

  // Handles uploading the chosen file.
  const submitHandler = async () => {
    const accessToken = authState.accessToken;

    // If the user is not logged in or no category nor image has been chosen,
    // then upload should not be permited.
    if (!accessToken) return;
    if (disableSubmit) return;

    const result = await uploadImage(chosenImage, chosenCategory, accessToken);

    // If the image could not be uploaded, then show an error.
    if (errorStatusCode(result.status)) {
      setHasError(true);
      setMessage(result.message);
      return;
    }

    // If the image was successfully uploaded, redirect to gallery.
    navigate("/bilder");
  };

  return (
    <NewImage
      onCategoryChange={categoryChangeHandler}
      categories={availableCategories}
      onFileChange={fileChangeHandler}
      onSubmit={submitHandler}
      disableSubmit={disableSubmit}
      hasError={hasError}
      message={message}
    />
  );
};

export default NewImagePage;
