import { createContext } from "react";

const FirebaseContext = createContext({
  getCategoryImages: (category) => {},
  getCategories: () => {},
  addImage: (category, image, title) => {},
  deleteImage: (category, imageId) => {},
})

export default FirebaseContext; 