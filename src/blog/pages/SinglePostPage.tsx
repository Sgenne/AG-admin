import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SinglePost from "../UI/SinglePost";
import { BlogPost } from "../blog.interface";
import { getBlogPostById } from "../../utils/backendUtils";
import { errorStatusCode } from "../../utils/utils";

/**
 *
 * Fetches a single blog post from the backend, using url parameter
 * postId, and displays the post. Gives options to edit and delete
 * the post.
 *
 * @component
 */
const SinglePostPage = () => {
  const [post, setPost] = useState<BlogPost>();
  const [error, setError] = useState<Error>();

  const { postId } = useParams();

  // Fetch blog post from backend when page is loaded.
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      const result = await getBlogPostById(postId);

      if (errorStatusCode(result.status)) {
        setError(new Error(result.message));
        return;
      }
      
      setPost(result.blogPost);
    };
    fetchPost();
  }, [postId]);

  if (error) {
    throw error;
  }

  if (!post) return <></>;

  const deletePostHandler = () => {};

  return <SinglePost post={post} onDeletePost={deletePostHandler} />;
};
export default SinglePostPage;
