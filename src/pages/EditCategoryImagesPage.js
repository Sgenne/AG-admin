import { useContext, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";

import FirebaseContext from "../store/firebase-context";

import EditCategoryImages from "../components/images/EditCategoryImages";

const EditCategoryImagesPage = () => {
  const [images, setImages] = useState([]);
  const { category } = useParams();
  const firebaseContext = useContext(FirebaseContext);

  const updateDisplayedImages = useCallback(async () => {
    const fetchedImages = await firebaseContext.getCategoryImages(category);
    if (fetchedImages.images) {
      setImages(fetchedImages.images);
    }
  }, [category, firebaseContext]);

  const addImageHandler = async (image, title) => {
    await firebaseContext.addImage(category, image, title);
    updateDisplayedImages();
  };

  const deleteImageHandler = async (imageId) => {
    await firebaseContext.deleteImage(category, imageId);
    updateDisplayedImages();
  };

  useEffect(() => {
    updateDisplayedImages();
  }, [updateDisplayedImages]);

  return (
    <>
      <EditCategoryImages
        onDeleteImage={deleteImageHandler}
        onAddImage={addImageHandler}
        images={images}
      />
    </>
  );
};

export default EditCategoryImagesPage;
