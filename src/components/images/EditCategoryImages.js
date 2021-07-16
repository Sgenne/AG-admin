import styles from "./EditCategoryImages.module.css";
import ImageItem from "./ImageItem";

const EditCategoryImages = (props) => {
  const imageItems = props.images.map((image) => <ImageItem image={image} />);

  return (
    <div className={styles["container"]}>
      {imageItems}
      <button>Ny bild</button>
    </div>
  );
};

export default EditCategoryImages;
