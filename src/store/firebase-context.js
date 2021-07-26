import { createContext } from "react";

const FirebaseContext = createContext({
  getCategoryImages: (category) => {},
  getScrollingImages: () => {},
  getCategories: () => {},
  addImage: (category, image, title) => {},
  addScrollingImage: (image) => {},
  deleteImage: (category, imageId) => {},
  deleteScrollingImage: (imageId) => {},
});

export default FirebaseContext;
