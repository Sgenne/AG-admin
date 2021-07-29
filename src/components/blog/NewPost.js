import { useContext, useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import styles from "./NewPost.module.css";
import UploadAdapterPlugin from "../../CkEditor/upload-adapter";
import FirebaseContext from "../../store/firebase-context";

const NewPost = (props) => {
  const [addedImages, setAddedImages] = useState(props.initialImages || []);
  const [postTitle, setPostTitle] = useState(props.initialTitle || "");
  const [postContent, setPostContent] = useState(props.initialContent || "");

  const firebaseContext = useContext(FirebaseContext);

  const validInput = postTitle !== "" && postContent !== "";

  const titleChangeHandler = (event) => {
    setPostTitle(event.target.value);
  };

  const newImageAddedHandler = (image) => {
    setAddedImages((prevImages) => [image, ...prevImages]);
  };

  const postContentChangeHandler = (_, editor) => {
    const data = editor.getData();
    setPostContent(data);
  };

  const submitButtonHandler = () => {
    if (!validInput) return;
    props.onAddPost({
      content: postContent,
      title: postTitle,
      addedImages: addedImages,
    });
  };

  console.log("props.initialTitle", props.initialTitle)

  return (
    <div className={styles["container"]}>
      <div className={styles["editor-container"]}>
        <CKEditor
          editor={ClassicEditor}
          onChange={postContentChangeHandler}
          data={postContent}
          config={{
            extraPlugins: [
              UploadAdapterPlugin.bind(
                null,
                firebaseContext,
                newImageAddedHandler
              ),
            ],
          }}
          onReady={(editor) => {
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "height",
                "100%",
                editor.editing.view.document.getRoot()
              );
            });
          }}
        />
      </div>
      <div className={styles["control-section"]}>
        <div className={styles["title-input-section"]}>
          <label htmlFor="title-input">Titel:</label>
          <input
            value={postTitle}
            onChange={titleChangeHandler}
            type="text"
            name="title"
            id="title-input"
            className={styles["title-input"]}
          />
        </div>
        <button
          onClick={submitButtonHandler}
          className={`${styles["btn"]} ${
            validInput ? styles["valid-btn"] : styles["invalid-btn"]
          }`}
          type="submit"
        >
          {props.submitText || "Lägg till"}
        </button>
      </div>
    </div>
  );
};

export default NewPost;
