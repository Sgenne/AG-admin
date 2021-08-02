import DeleteButton from "../images/DeleteButton";
import styles from "./BlogPostItem.module.css";

const BlogPostItem = (props) => {
  const { title, timestamp, onDelete, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={styles["blog-post-item"]}
    >
      <div>
        <h2 className={styles["blog-post-item__header"]}>{title}</h2>
        <p className={styles["blog-post-item__timestamp"]}>{timestamp}</p>
      </div>
      <div className={styles["blog-post-item__btns"]}>
          <DeleteButton onClick={onDelete} />
      </div>
    </div>
  );
};

export default BlogPostItem;
