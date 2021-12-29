import { useState, useEffect } from "react";
import ImageOverview from "../components/images/ImageOverview";

import useBackend from "../hooks/useBackend";
import { IImage } from "../interfaces/image";

const GalleryPage = () => {
  const [images, setImages] = useState<[IImage]>();

  const { getAllGalleryImages } = useBackend();

  // fetch images from backend when page is loaded
  useEffect(() => {
    const fetchImages = async () => {
      const result = await getAllGalleryImages();
      setImages(result.images);
    };
    fetchImages();
  }, [getAllGalleryImages]);

  return <ImageOverview images={images} />;
};

export default GalleryPage;
