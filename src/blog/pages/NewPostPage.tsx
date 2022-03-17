import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "../../interfaces/Image.interface";
import { StoreState } from "../../store/store";
import { uploadImage } from "../../utils/backendUtils";
import NewPost from "../UI/NewPost";

const NewPostPage = () => {
  const [postContent, setPostContent] = useState("");
  const [images, setimages] = useState<Image[]>()

  const authState = useSelector((state: StoreState) => state.auth);

  const postContentChangeHandler = (newContent: string) =>
    setPostContent(newContent);

    // const imageInsertHandler = async (image: File) => {
    //   uploadImage(image, "")
    // }



  return (
    <NewPost
      postContent={postContent}
      onPostContentChange={postContentChangeHandler}
    />
  );
};

export default NewPostPage;
