import { useContext } from "react";
import { useHistory } from "react-router-dom";

import NewPost from "../../components/blog/NewPost";
import FirebaseContext from "../../store/firebase-context";

const NewBlogPostPage = () => {
  const history = useHistory();

  const firebaseContext = useContext(FirebaseContext);

  const addNewPostHandler = (post) => {
    firebaseContext.addBlogPost(post);
    history.push("/blogg/inlagg");
  };

  return <NewPost onSubmit={addNewPostHandler} />;
};

export default NewBlogPostPage;
