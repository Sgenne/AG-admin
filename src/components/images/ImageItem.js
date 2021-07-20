import styles from "./ImageItem.module.css";
import ImageItemButton from "./ImageItemButton";

const ImageItem = (props) => {
  return (
    <div className={styles["image-item"]}>
      <div className={styles["info-container"]}>
        <h2>{props.image.title}</h2>
        <img src={props.image["preview-url"]} alt="" />
      </div>
      <div className={styles["control-section"]}>
        <ImageItemButton onClick={props.onDelete} />        
      </div>
    </div>
  );
};

export default ImageItem;
