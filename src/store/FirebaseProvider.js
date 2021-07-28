import imageCompression from "browser-image-compression";

import firebase from "firebase";
import "firebase/database";
import "firebase/storage";

import FirebaseContext from "./firebase-context";

firebase.initializeApp({
  apiKey: "AIzaSyAX8L6EW_qA1hHJar-rA4VMX2m8DmhWc98",
  authDomain: "foto-7b483.firebaseapp.com",
  databaseURL:
    "https://foto-7b483-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "foto-7b483",
  storageBucket: "foto-7b483.appspot.com",
  messagingSenderId: "257680495752",
  appId: "1:257680495752:web:e4f51d2f1d50d13aecfb3d",
});

const PREVIEW_IMAGE_COMPRESSION_OPTIONS = {
  maxSizeMB: 0.08,
};

const LARGE_IMAGE_COMPRESSION_OPTIONS = {
  maxSizeMB: 3,
};

const dbRef = firebase.database().ref();
const storageRef = firebase.storage().ref();

const GALLERY_IMAGES_PATH = "gallery-images";
const GALLERY_CATEGORIES_PATH = "gallery-categories";
const SCROLLING_IMAGES_PATH = "scrolling-images";
const BLOG_POSTS_PATH = "blog-posts";

const FirebaseProvider = (props) => {
  const getCategoryImages = async (category) => {
    try {
      const fetchedImages = await dbRef
        .child(`${GALLERY_IMAGES_PATH}/${category.toLowerCase()}`)
        .get();

      if (!fetchedImages.exists()) return { images: [] };

      const imageArray = Object.values(fetchedImages.val());
      return { images: imageArray };
    } catch (err) {
      return { error: err };
    }
  };

  const getScrollingImages = async () => {
    try {
      const fetchedImages = await dbRef.child(`${SCROLLING_IMAGES_PATH}`).get();

      if (!fetchedImages.exists()) return { images: [] };

      const imageArray = Object.values(fetchedImages.val());
      return { images: imageArray };
    } catch (err) {
      return { error: err };
    }
  };

  const getCategories = async () => {
    try {
      const result = await dbRef.child(GALLERY_CATEGORIES_PATH).get();
      const categories = result.val();
      return { categories: Object.values(categories) };
    } catch (err) {
      return { error: err };
    }
  };

  // Make new function for uploading scrolling image
  const addImage = async (category, image) => {
    try {
      const previewImage = await imageCompression(
        image,
        PREVIEW_IMAGE_COMPRESSION_OPTIONS
      );
      const largeImage = await imageCompression(
        image,
        LARGE_IMAGE_COMPRESSION_OPTIONS
      );

      const imageId = dbRef
        .child(`${GALLERY_IMAGES_PATH}/${category.toLowerCase()}`)
        .push().key;

      const firebaseFilePath = storageRef.child(
        `images/${category.toLowerCase()}/${imageId}.jpg`
      );
      await firebaseFilePath.put(largeImage);
      const downloadUrl = await firebaseFilePath.getDownloadURL();

      const firebaseThumbnailPath = storageRef.child(
        `images/${category.toLowerCase()}/${imageId}preview.jpg`
      );
      await firebaseThumbnailPath.put(previewImage);
      const previewUrl = await firebaseThumbnailPath.getDownloadURL();

      await dbRef
        .child(`${GALLERY_IMAGES_PATH}/${category.toLowerCase()}/${imageId}`)
        .set({
          id: imageId,
          "download-url": downloadUrl,
          "preview-url": previewUrl,
        });

      const uploadedImage = { id: imageId };
      uploadedImage["download-url"] = downloadUrl;
      uploadedImage["preview-url"] = previewUrl;

      return uploadedImage;
    } catch (err) {
      return {
        error: err,
      };
    }
  };

  const addScrollingImage = async (image) => {
    try {
      const imageId = dbRef.child(SCROLLING_IMAGES_PATH).push().key;

      const compressedImage = await imageCompression(
        image,
        LARGE_IMAGE_COMPRESSION_OPTIONS
      );

      const firebaseFilePath = storageRef.child(
        `images/framsida/${imageId}.jpg`
      );

      await firebaseFilePath.put(compressedImage);
      const downloadUrl = await firebaseFilePath.getDownloadURL();

      await dbRef.child(`${SCROLLING_IMAGES_PATH}/${imageId}`).set({
        id: imageId,
        "download-url": downloadUrl,
      });

      const uploadedImage = { id: imageId };
      uploadedImage["download-url"] = downloadUrl;

      return uploadedImage;
    } catch (error) {
      return { error };
    }
  };

  const addCKEditorImage = async (image) => {
    try {
      const storagePath = storageRef.child(`images/CKEditor/${image.name}`);
      await storagePath.put(image);
      const downloadUrl = await storagePath.getDownloadURL();
      return { default: downloadUrl };
    } catch (error) {
      return { error };
    }
  };

  const deleteImage = async (category, imageId) => {
    try {
      const entryRef = dbRef.child(
        `${GALLERY_IMAGES_PATH}/${category.toLowerCase()}/${imageId}`
      );
      await entryRef.remove();

      const storagePath = storageRef.child(
        `images/${category.toLowerCase()}/${imageId}.jpg`
      );

      const previewStoragePath = storageRef.child(
        `images/${category.toLowerCase()}/${imageId}preview.jpg`
      );

      await storagePath.delete();
      await previewStoragePath.delete();

      return {};
    } catch (err) {
      return {
        error: err,
      };
    }
  };

  const deleteScrollingImage = async (imageId) => {
    try {
      const entryRef = dbRef.child(`${SCROLLING_IMAGES_PATH}/${imageId}`);
      await entryRef.remove();

      const storagePath = storageRef.child(`images/framsida/${imageId}.jpg`);

      await storagePath.delete();

      return {};
    } catch (error) {
      return { error };
    }
  };

  const deleteCKEditorImage = (imageName) => {
    try {
      const storagePath = storageRef.child(`images/CKEditor/${imageName}`);
      storagePath.delete();
      return {};
    } catch (error) {
      return { error };
    }
  };

  const addBlogPost = async (post) => {
    const timestamp = new Date().toISOString();
    try {
      const postDbPath = dbRef.child(BLOG_POSTS_PATH);
      const postId = postDbPath.push().key;

      const postObject = {
        content: post.content,
        timestamp: timestamp,
        id: postId,
        addedImages: post.addedImages,
      };

      await postDbPath.child(postId).set(postObject);
      return {
        post: postObject,
      };
    } catch (error) {
      return { error };
    }
  };

  const firebaseContext = {
    getCategoryImages,
    getScrollingImages,
    getCategories,
    addImage,
    addScrollingImage,
    addCKEditorImage,
    deleteImage,
    deleteScrollingImage,
    deleteCKEditorImage,
    addBlogPost,
  };

  return (
    <FirebaseContext.Provider value={firebaseContext}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
