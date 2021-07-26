import { useState } from "react";

import styles from "./EditImages.module.css";
import ImageItem from "./ImageItem";
import NewImageModal from "./new-image/NewImageModal";

const EditImages = (props) => {
  const [showModal, setShowModal] = useState(false);

  const newImageButtonHandler = () => {
    setShowModal(true);
  };

  const newImageSubmittedHandler = (image) => {
    props.onAddImage(image);
    setShowModal(false);
  };

  const imageItems = props.images.length !== 0 ? props.images.map((image) => (
    <ImageItem onDelete={() => props.onDeleteImage(image.id)} key={image.id} image={image} />
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

export default EditImages;
