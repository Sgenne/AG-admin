import { useContext, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";

import FirebaseContext from "../../store/firebase-context";

import EditImages from "../../components/images/EditImages";

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

  const addImageHandler = async (image) => {
    const result = await firebaseContext.addImage(category, image);

    if (!result.error) {
      setImages((prevImages) => [...prevImages, result]);
    }
  };

  const deleteImageHandler = async (imageId) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.id !== imageId)
    );
    firebaseContext.deleteImage(category, imageId);
  };

  useEffect(() => {
    updateDisplayedImages();
  }, [updateDisplayedImages]);

  return (
    <>
      <EditImages
        onDeleteImage={deleteImageHandler}
        onAddImage={addImageHandler}
        images={images}
      />
    </>
  );
};

export default EditCategoryImagesPage;
