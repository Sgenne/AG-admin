import { createContext } from "react";

const FirebaseContext = createContext({
  getCategoryImages: (category) => {},
  getScrollingImages: () => {},
  getCategories: () => {},
  addImage: (category, image, title) => {},
  addScrollingImage: (image) => {},
  addCKEditorImage: (image) => {},
  deleteImage: (category, imageId) => {},
  deleteScrollingImage: (imageId) => {},
  deleteCKEditorImage: (imageName) => {},
  addBlogPost: (post, addedImages) => {},
  updateBlogPost: (post) => {},
  deleteBlogPost: (postId) => {},
  getBlogPost: (postId) => {},
  getAllBlogPosts: () => {},
});

export default FirebaseContext;
