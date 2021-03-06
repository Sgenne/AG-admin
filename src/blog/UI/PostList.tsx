import "../CSS/PostList.css";
import { BlogPost } from "../blog.interface";
import PostListItem from "./PostListItem";

interface IPostListProps {
  posts: BlogPost[];
  onPostClicked: (post: BlogPost) => void;
}

/**
 * Displays a given list of blog posts.
 *
 * @param posts The list of blog posts to display.
 * @param onPostClicked Handler for when a blog post has been clicked.
 *
 * @component
 */
const PostList = ({ posts, onPostClicked }: IPostListProps) => {
  const listItems = posts.map((post) => (
    <li
      className="blog-post-list__item-container"
      key={post._id}
      onClick={() => onPostClicked(post)}
    >
      <PostListItem post={post} />
    </li>
  ));

  return <ul className="blog-post-list">{listItems}</ul>;
};

export default PostList;
