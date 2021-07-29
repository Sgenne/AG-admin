import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import PostList from "../../components/blog/PostList";
import FirebaseContext from "../../store/firebase-context";

const BlogPostListPage = () => {
  const [posts, setPosts] = useState([]);

  const history = useHistory();

  const firebaseContext = useContext(FirebaseContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await firebaseContext.getAllBlogPosts();
      setPosts(fetchedPosts.posts);
    };
    fetchPosts();
  }, [firebaseContext]);

  const deleteBlogPostHandler = (postId) => {
    firebaseContext.deleteBlogPost(postId);
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const postClickedHandler = (postId) => {
    history.push(`/blogg/redigera-inlagg/${postId}`);
  };

  return (
    <PostList
      posts={posts}
      onDeletePost={deleteBlogPostHandler}
      onPostClicked={postClickedHandler}
    />
  );
};

export default BlogPostListPage;