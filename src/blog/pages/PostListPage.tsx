import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../UI/PostList";
import { BlogPost } from "../blog.interface";
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
  const [posts, setPosts] = useState<BlogPost[]>([]);
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

  const postClickedHandler = (post: BlogPost) => {
    navigate("/blogg/" + post._id);
  };

  return <PostList posts={posts} onPostClicked={postClickedHandler} />;
};

export default PostListPage;
