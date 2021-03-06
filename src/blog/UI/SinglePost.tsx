import parse from "html-react-parser";

import { BlogPost } from "../blog.interface";
import Button from "../../common/UI/Button";
import "../CSS/SinglePost.css";

interface ISinglePostProps {
  post: BlogPost;
  onDeletePost: () => void;
}

/**
 *
 * Displays one blog post.
 *
 * @param post The post to display.
 * @param onDeletePost Function called when delete post button is clicked.
 * @component
 */
const SinglePost = ({ post, onDeletePost }: ISinglePostProps) => {
  const editPostButtonHandler = () => {};

  const postContent = parse(post.content);

  return (
    <div className="single-blog-post">
      <div className="single-blog-post__post">
        <h1 className="single-blog-post__post-title">{post.title}</h1>
        <div className="single-blog-post__content-container">{postContent}</div>
      </div>
      <div className="single-blog-post__control">
        <Button onClick={editPostButtonHandler}>Redigera inlägg</Button>
        <Button onClick={onDeletePost}>Ta bort inlägg</Button>
      </div>
    </div>
  );
};

export default SinglePost;
