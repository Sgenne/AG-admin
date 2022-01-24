import "../../css/blog/PostList.css";
import { IBlogPost } from "../../interfaces/blog";
import PostListItem from "./PostListItem";

interface IPostListProps {
  posts: IBlogPost[];
}

const PostList = ({ posts }: IPostListProps) => {
  const listItems = posts.map((post) => (
    <li className="blog-post-list__item-container" key={post._id}>
      <PostListItem post={post} />
    </li>
  ));

  return <ul className="blog-post-list">{listItems}</ul>;
};

export default PostList;
