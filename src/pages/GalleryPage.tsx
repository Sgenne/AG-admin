import { useState, useEffect } from "react";
import Gallery from "../components/Gallery";

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

  return <Gallery images={images} />;
};

export default GalleryPage;
