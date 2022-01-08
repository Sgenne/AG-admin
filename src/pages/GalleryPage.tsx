import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Gallery from "../components/Gallery";

import { getAllGalleryImages } from "../utils/backendUtils";
import { IImage } from "../interfaces/image";

const GalleryPage = () => {
  const [images, setImages] = useState<[IImage]>();
  const navigate = useNavigate();

  // fetch images from backend when page is loaded
  useEffect(() => {
    const fetchImages = async () => {
      const result = await getAllGalleryImages();
      setImages(result.images);
    };
    fetchImages();
  }, []);

  const imageClickHandler = (image: IImage) => {
    navigate(`/bilder/${image._id}`);
  };

  const newImageButtonHandler = () => {
    navigate("/ny-bild");
  };

  return (
    <Gallery
      images={images}
      onImageClick={imageClickHandler}
      onNewImageButtonClicked={newImageButtonHandler}
    />
  );
};

export default GalleryPage;
