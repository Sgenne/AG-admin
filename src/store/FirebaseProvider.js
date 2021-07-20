import imageCompression from "browser-image-compression";

import firebase from "firebase";
import "firebase/database";
import "firebase/storage";

import FirebaseContext from "./firebase-context";

const IMAGE_COMPRESSION_OPTIONS = {
  maxSizeMB: 0.1,
};

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

const dbRef = firebase.database().ref();
const storageRef = firebase.storage().ref();

const GALLERY_IMAGES_PATH = "gallery-images";
const GALLERY_CATEGORIES_PATH = "gallery-categories";

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

  const getCategories = async () => {
    const result = await dbRef.child(GALLERY_CATEGORIES_PATH).get();
    const categories = result.val();

    return Object.values(categories);
  };

  const addImage = async (category, image, title) => {
    const previewImage = await imageCompression(image, IMAGE_COMPRESSION_OPTIONS);


    const imageId = dbRef
      .child(`${GALLERY_IMAGES_PATH}/${category.toLowerCase()}`)
      .push().key;

    const firebaseFilePath = storageRef.child(
      `images/${category.toLowerCase()}/${imageId}.jpg`
    );
    await firebaseFilePath.put(image);
    const downloadUrl = await firebaseFilePath.getDownloadURL();

    const firebaseThumbnailPath = storageRef.child(
      `images/${category.toLowerCase()}/${imageId}preview.jpg`
    );
    await firebaseThumbnailPath.put(previewImage);
    const previewUrl = await firebaseThumbnailPath.getDownloadURL();

    console.log("previewUrl: ", previewUrl);

    await dbRef
      .child(`${GALLERY_IMAGES_PATH}/${category.toLowerCase()}/${imageId}`)
      .set({
        title,
        id: imageId,
        "download-url": downloadUrl,
        "preview-url": previewUrl,
      });
  };

  const deleteImage = async (category, imageId) => {
    const entryRef = dbRef.child(
      `${GALLERY_IMAGES_PATH}/${category.toLowerCase()}/${imageId}`
    );
    await entryRef.remove();

    const storagePath = storageRef.child(
      `images/${category.toLowerCase()}/${imageId}.jpg`
    );

    const previewStoragePath = storageRef.child(
      `images/${category.toLowerCase()}/${imageId}preview.jpg`
    )

    await storagePath.delete();
    await previewStoragePath.delete();
  };

  const firebaseContext = {
    getCategoryImages,
    getCategories,
    addImage,
    deleteImage,
  };

  return (
    <FirebaseContext.Provider value={firebaseContext}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
