import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import NewPost from "../../components/blog/NewPost";
import FirebaseContext from "../../store/firebase-context";

const EditBlogPostPage = () => {
  const [post, setPost] = useState();

  const { postId } = useParams();

  const firebaseContext = useContext(FirebaseContext);

  useEffect(() => {
    const fetchPost = async (postId) => {
      const result = await firebaseContext.getBlogPost(postId);
      setPost(result.post);
    };
    fetchPost(postId); // postid
  }, [firebaseContext, postId]);

  if (!post) {
    return <div></div>
  }
  console.log("post in EditBLogPage: ", post)
  console.log("initialTitle given to NewPost from EditBlogPage: ", post.title)

  return (
    <NewPost
      initialTitle={post.title}
      initialContent={post.content}
      initialImages={post.addedImages}
      submitText="Uppdatera inlägg"
    />
  );
};

export default EditBlogPostPage;
