import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ScrollingImages from "../UI/ScrollingImages";
import Image from "../../interfaces/Image.interface";
import PreviewImage from "../../interfaces/PreviewImage.interface";
import ScrollingImage from "../../interfaces/ScrollingImage.interface";
import { IStoreState } from "../../store/store";
import {
  getAllGalleryImages,
  getScrollingImages,
  replaceScrollingImages,
} from "../../utils/backendUtils";

const ScrollingImagesPage = () => {
  // All images in gallery.
  const [availableImages, setAvailableImages] = useState<PreviewImage[]>([]);

  // The ids of the current scrolling images.
  const [scrollingImageIds, setScrollingImageIds] = useState<string[]>([]);

  // Indicates whether the scrolling images were updated successfully.
  const [successfullyUpdated, setSuccessfullyUpdated] = useState(false);

  // Message displayed to the user.
  const [message, setMessage] = useState("");

  // The user-id and access-token of the signed in user.
  const { accessToken } = useSelector((state: IStoreState) => state.auth);

  useEffect(() => {
    // Fetches available images and current scrolling images from backend.
    const fetchImages = async () => {
      // Fetch current scrolling images and all available images from backend.
      const [availableImages, currentScrollingImages] = await Promise.all([
        getAllGalleryImages(),
        getScrollingImages(),
      ]);

      // Ids of the already scrolling images.
      const currentScrollingImageIds = currentScrollingImages.scrollingImages
        // Sort by order of appearance.
        .sort((a: ScrollingImage, b: ScrollingImage) =>
          b.order < a.order ? 1 : -1
        )
        // Only keep ids.
        .map((scrollingImage: ScrollingImage) => scrollingImage.image._id);

      // All images. The current scrolling images have highlight: true,
      // to indicate that they should have green borders.
      const previewImages = availableImages.images.map((image: Image) => {
        const highlight = currentScrollingImageIds.includes(image._id);
        return { ...image, highlight: highlight };
      });

      setAvailableImages(previewImages);
      setScrollingImageIds(currentScrollingImageIds);
    };
    fetchImages();
  }, []);

  // Set the text of each scrolling image to its order of appearance.
  useEffect(() => {
    setAvailableImages((prevImages) =>
      prevImages.map((image) => {
        // If the image is not a scrolling image, then set its text to empty.
        if (!scrollingImageIds.includes(image._id))
          return { ...image, text: "" };

        // The order of appearance of the current scrolling image.
        const scrollingImageIndex =
          scrollingImageIds.findIndex((id) => id === image._id) + 1;

        // Set the scrolling image's text to its order of appearance.
        return { ...image, text: String(scrollingImageIndex) };
      })
    );
  }, [scrollingImageIds]);

  // Handles an image being clicked. If the image is a scrolling image, then
  // it is removed from scrollingImageIds. Otherwise, it is added to the list.
  const imageClickedHandler = (image: PreviewImage) => {
    // If the image is currently in scrollingImageIds, then remove it.
    if (scrollingImageIds.includes(image._id)) {
      setScrollingImageIds((prevList) =>
        prevList.filter((id) => id !== image._id)
      );
    } else {
      // If the image is not in scrollingImageIds, then add it .
      setScrollingImageIds((prevList) => [...prevList, image._id]);
    }

    // The "highlight" value of the clicked image should be inverted.
    setAvailableImages((prevImages) =>
      prevImages.map((img) => ({
        ...img,
        highlight: img._id === image._id ? !img.highlight : img.highlight,
      }))
    );
  };

  // Sends the new list of scrolling images to the backend.
  const submitChangesHandler = async () => {
    const result = await replaceScrollingImages(scrollingImageIds, accessToken);

    // Show success popup if the images were successfully replaced.
    if (result.status === 200) {
      setSuccessfullyUpdated(true);
      setMessage("Framsidan har uppdaterats!");
    }
    // Show error page if the update failed.
    else {
      const error = new Error(result.message);
      throw error;
    }
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
      successfullyUpdated={successfullyUpdated}
      message={message}
    />
  );
};

export default ScrollingImagesPage;
