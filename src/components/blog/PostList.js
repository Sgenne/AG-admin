import BlogPostItem from "./BlogPostItem";
import styles from "./PostList.module.css";

const PostList = (props) => {
  const { posts, onDeletePost, onPostClicked } = props;

  const postItems = posts.map((post) => (
    <li key={post.title + post.timestamp} className={styles["post-list__item"]}>
      <BlogPostItem
        title={post.title}
        timestamp={post.timestamp}
        onDelete={onDeletePost.bind(null, post.id)}
        onClick={onPostClicked.bind(null, post.id)}
      />
    </li>
  ));

  return <ul className={styles["post-list"]}>{postItems}</ul>;
};

export default PostList;
