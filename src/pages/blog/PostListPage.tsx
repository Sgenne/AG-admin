import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../../components/blog/PostList";
import { IBlogPost } from "../../interfaces/blog";
import { getBlogPosts } from "../../utils/backendUtils";
import { errorStatusCode } from "../../utils/utils";

/**
 * Renders all available blog posts together with options to edit posts
 * and add new posts.
 *
 * @component
 *
 */
const PostListPage = () => {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [error, setError] = useState<Error>();

  const navigate = useNavigate();

  // Fetch blog posts from backend.
  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getBlogPosts();

      if (errorStatusCode(result.status)) {
        setError(new Error(result.message));
        return;
      }

      setPosts(result.blogPosts);
    };
    fetchPosts();
  }, []);

  if (error) throw error;

  const postClickedHandler = (post: IBlogPost) => {
    navigate("/blogg/" + post._id);
  };

  return <PostList posts={posts} onPostClicked={postClickedHandler} />;
};

export default PostListPage;
