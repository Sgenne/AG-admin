import { useState, useEffect, useContext } from "react";
import EditImages from "../components/images/EditImages";

import FirebaseContext from "../store/firebase-context";

const EditScrollingImagesPage = () => {
  const [images, setImages] = useState([]);

  const firebaseContext = useContext(FirebaseContext);

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = await firebaseContext.getScrollingImages();
      if (fetchedImages.images) {
        setImages(fetchedImages.images);
      }
    };
    fetchImages();
  }, [firebaseContext]);

  const addImageHandler = async (image) => {
    const result = await firebaseContext.addScrollingImage(image);

    if (!result.error) {
      setImages((prevImages) => [...prevImages, result]);
    }
  };

  const deleteImageHandler = async (imageId) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.id !== imageId)
    );
    firebaseContext.deleteScrollingImage(imageId);
  };

  return (
    <EditImages
      images={images}
      onAddImage={addImageHandler}
      onDeleteImage={deleteImageHandler}
    />
  );
};

export default EditScrollingImagesPage;
