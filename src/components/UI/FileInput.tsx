import { ChangeEventHandler, useRef } from "react";

import "../../css/UI/FileInput.css";
import Button from "./Button";

interface IFileInputProps {
  onFileChange: (file: File) => void;
  children: string;
}

const FileInput = ({ onFileChange, children }: IFileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadButtonHandler = () => {
    if (!inputRef || !inputRef.current) return;

    inputRef.current.click();
  };

  const fileChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) return;

    const chosenFile = event.target.files[0];
    onFileChange(chosenFile);
  };

  return (
    <span>
      <input
        style={{ display: "none" }}
        type="file"
        ref={inputRef}
        onChange={fileChangeHandler}
      />
      <Button onClick={uploadButtonHandler}>{children}</Button>
    </span>
  );
};

export default FileInput;
