import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { IImage } from "../interfaces/image";
import SingleImage from "../components/images/SingleImage";
import { getImageById, deleteImage } from "../utils/backendUtils";
import { useSelector } from "react-redux";
import { IStoreState } from "../store/store";

const SingleImagePage = () => {
  const [image, setImage] = useState<IImage>();

  const authState = useSelector((state: IStoreState) => state.auth);

  const { imageId } = useParams();

  // fetch image when page is loaded
  useEffect(() => {
    const fetchImage = async () => {
      if (!imageId) return;
      const fetchResult = await getImageById(imageId);
      setImage(fetchResult.image);
    };

    fetchImage();
  }, [imageId]);

  const deleteImageHandler = () => {
    const sendRequest = async () => {
      const userId = authState.userId;
      const accessToken = authState.accessToken;

      if (!(userId && accessToken)) return;

      if (!imageId) return;

      await deleteImage(imageId, userId, accessToken);
    };
    sendRequest();
  };

  return <SingleImage image={image} onDeleteImage={deleteImageHandler} />;
};

export default SingleImagePage;
