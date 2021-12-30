import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IImage } from "../interfaces/image";

import useBackend from "../hooks/useBackend";
import SingleImage from "../components/images/SingleImage";

const SingleImagePage = () => {
  const [image, setImage] = useState<IImage>();

  const { getImageById } = useBackend();

  const { imageId } = useParams();

  // fetch image when page is loaded
  useEffect(() => {
    const fetchImage = async () => {
      if (!imageId) return;
      const fetchResult = await getImageById(imageId);
      console.log(fetchResult);
      setImage(fetchResult.image);
    };
    fetchImage();
  }, [imageId, getImageById]);

  return <SingleImage image={image}/>;
};

export default SingleImagePage;
