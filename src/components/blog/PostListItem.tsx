import "../../css/blog/PostListItem.css";
import { IBlogPost } from "../../interfaces/blog";

interface IPostListItemProps {
  post: IBlogPost;
}

const PostListItem = ({ post }: IPostListItemProps) => {
  const formatedDate = new Date(post.createdAt).toDateString();

  return (
    <div className="post-list-item">
      <h3 className="post-list-item__title">{post.title}</h3>
      <p className="post-list-item__info">Skapad: {formatedDate}</p>
    </div>
  );
};

export default PostListItem;
