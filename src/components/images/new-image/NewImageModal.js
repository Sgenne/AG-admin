import { useState, useRef } from "react";

import Modal from "../../ui/modal/Modal";
import styles from "./NewImageModal.module.css";

const NewImageModal = (props) => {
  const [enteredFile, setEnteredFile] = useState(null);

  const fileInputRef = useRef(null);


  const fileChangeHandler = (event) => {
    setEnteredFile(event.target.files[0]);
  };

  const selectImageClickedHandler = () => {
    fileInputRef.current.click();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.onSubmit(enteredFile);
  };

  return (
    <Modal>
      <div className={styles["container"]}>
        <form onSubmit={submitHandler}>
          <div className={styles["file-input-container"]}>
            <button
              className={styles["btn"]}
              onClick={selectImageClickedHandler}
              type="button"
            >
              Välj bild
            </button>
            <input value={enteredFile ? enteredFile.name : ""} type="text" disabled />
            <input
              ref={fileInputRef}
              onChange={fileChangeHandler}
              id="image-file"
              type="file"
            />
          </div>
          <div className={styles["button-section"]}>
            <button className={styles["btn"]}>Lägg till</button>
            <button className={styles["btn"]}>Avbryt</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewImageModal;
