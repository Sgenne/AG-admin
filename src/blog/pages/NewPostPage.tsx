import { useState } from "react";
import NewPost from "../UI/NewPost";

const NewPostPage = () => {
  const [postContent, setPostContent] = useState("");

  const postContentChangeHandler = (newContent: string) =>
    setPostContent(newContent);

  return (
    <NewPost
      postContent={postContent}
      onPostContentChange={postContentChangeHandler}
    />
  );
};

export default NewPostPage;
