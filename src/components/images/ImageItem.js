import styles from "./ImageItem.module.css";
import ImageItemButton from "./ImageItemButton";

const ImageItem = (props) => {
  const { title, imageUrl } = props.image;

  return (
    <div className={styles["image-item"]}>
      <div className={styles["info-container"]}>
        <h2>{title}</h2>
        <img src={imageUrl} alt={title} />
      </div>
      <div className={styles["control-section"]}>
        <ImageItemButton />        
      </div>
    </div>
  );
};

export default ImageItem;
