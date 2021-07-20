import { useState } from "react";

import styles from "./EditCategoryImages.module.css";
import ImageItem from "./ImageItem";
import NewImageModal from "./new-image/NewImageModal";

const EditCategoryImages = (props) => {
  const [showModal, setShowModal] = useState(false);

  const newImageButtonHandler = () => {
    setShowModal(true);
  };

  const newImageSubmittedHandler = (image) => {
    const { imageFile, imageTitle } = image;

    props.onAddImage(imageFile, imageTitle);

    setShowModal(false);
  };

  console.log(props.images)

  const imageItems = props.images.length !== 0 ? props.images.map((image) => (
    <ImageItem onDelete={() => props.onDeleteImage(image.id)} key={Math.random()} image={image} />
  )) : <h2 className={styles["error-message"]}>Inga bilder hittades.</h2>;

  return (
    <>
      {showModal && <NewImageModal onSubmit={newImageSubmittedHandler} />}
      <div className={styles["container"]}>
        <div className={styles["image-section"]}>{imageItems}</div>
        <div className={styles["button-section"]}>
          <button
            className={styles["new-image-btn"]}
            onClick={newImageButtonHandler}
          >
            Ny bild
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCategoryImages;
