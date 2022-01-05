import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { IImage, IImageCategory } from "../interfaces/image";
import useBackend from "../hooks/useBackend";
import SingleImage from "../components/images/SingleImage";

const SingleImagePage = () => {
  const [image, setImage] = useState<IImage>();

  const { getImageById, getGalleryCategories, deleteImage } = useBackend();

  const { imageId } = useParams();

  // fetch image when page is loaded
  useEffect(() => {
    const fetchImage = async () => {
      if (!imageId) return;
      const fetchResult = await getImageById(imageId);
      setImage(fetchResult.image);
    };

    fetchImage();
  }, [imageId, getImageById, getGalleryCategories]);

  const deleteImageHandler = () => {
    const sendRequest = async () => {
      if (!imageId) return;

      const result = await deleteImage(imageId);

      console.log(result);
    };
    sendRequest();
  };

  return <SingleImage image={image} onDeleteImage={deleteImageHandler} />;
};

export default SingleImagePage;
