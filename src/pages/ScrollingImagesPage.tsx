import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ScrollingImages from "../components/images/ScrollingImages";
import { IImage } from "../interfaces/image";
import { IStoreState } from "../store/store";
import {
  getAllGalleryImages,
  getScrollingImages,
  replaceScrollingImages,
} from "../utils/backendUtils";

const ScrollingImagesPage = () => {
  // All images in gallery.
  const [availableImages, setAvailableImages] = useState<IImage[]>([]);

  // The ids of the current scrolling images.
  const [scrollingImageIds, setScrollingImageIds] = useState<string[]>([]);

  const { userId, accessToken } = useSelector(
    (state: IStoreState) => state.auth
  );

  useEffect(() => {
    // Fetches available images and current scrolling images from backend.
    const fetchImages = async () => {
      // Fetch current scrolling images and all available images from backend.
      const [availableImages, currentScrollingImages] = await Promise.all([
        getAllGalleryImages(),
        getScrollingImages(),
      ]);

      setAvailableImages(availableImages);
      setScrollingImageIds(
        currentScrollingImages.map((img: IImage) => img._id)
      );
    };
    fetchImages();
  }, []);

  // Handles an image being clicked. If the image is a scrolling image, then
  // it is removed from scrollingImageIds. Otherwise, it is added to the list.
  const imageClickedHandler = (image: IImage) => {
    // If the image is currently in scrollingImageIds, then remove it.
    if (scrollingImageIds.includes(image._id)) {
      setScrollingImageIds((prevList) =>
        prevList.filter((id) => id !== image._id)
      );
      return;
    }

    // If the image is not in scrollingImageIds, then add it.
    setScrollingImageIds((prevList) => [...prevList, image._id]);
  };

  // Sends the new list of scrolling images to the backend.
  const submitChangesHandler = () => {
    replaceScrollingImages(scrollingImageIds, userId, accessToken);
  };

  // The images that will be shown in the ScrollingImages component.
  const displayedImages = availableImages.map((image) => ({
    ...image,
    isScrollingImage: scrollingImageIds.includes(image._id), // True if the image is currently a scrolling image.
  }));

  return (
    <ScrollingImages
      images={displayedImages}
      onImageClicked={imageClickedHandler}
      onSubmitChanges={submitChangesHandler}
    />
  );
};

export default ScrollingImagesPage;
