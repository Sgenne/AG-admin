import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { IImage } from "../../interfaces/image";
import SingleImage from "../../components/images/SingleImage";
import { getImageById, deleteImage } from "../../utils/backendUtils";
import { useSelector } from "react-redux";
import { IStoreState } from "../../store/store";

const SingleImagePage = () => {
  const [image, setImage] = useState<IImage>();
  const [hasError, setHasError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const authState = useSelector((state: IStoreState) => state.auth);
  const { imageId } = useParams();
  const navigate = useNavigate();

  // Fetch image when page is loaded.
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
      const accessToken = authState.accessToken;

      if (!accessToken) return;

      if (!imageId) return;

      const result = await deleteImage(imageId, accessToken);

      // If the image was deleted successfully, then the user is
      // redirected to the gallery.
      if (result.status === 200) {
        navigate("/bilder");
      }

      // If the image could not be deleted, then an error is shown.
      setHasError(true);
      setMessage(result.message);
    };
    sendRequest();
  };

  return (
    <SingleImage
      image={image}
      onDeleteImage={deleteImageHandler}
      hasError={hasError}
      message={message}
    />
  );
};

export default SingleImagePage;
