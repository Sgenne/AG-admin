import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../CSS/NewPost.css";

interface NewPostProps {
  postContent: string;
  onPostContentChange: (value: string) => void;
}

const NewPost = ({ postContent, onPostContentChange }: NewPostProps) => {

  return (
    <div className="new-post">
      <ReactQuill
        theme="snow"
        value={postContent}
        onChange={onPostContentChange}
      />
    </div>
  );
};

export default NewPost;
