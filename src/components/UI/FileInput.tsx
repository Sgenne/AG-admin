import { ChangeEventHandler, useRef, useState } from "react";

import "../../css/UI/FileInput.css";
import Button from "./Button";

interface IFileInputProps {
  onFileChange: (file: File) => void;
  children: string;
}

const FileInput = ({ onFileChange, children }: IFileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [label, setLabel] = useState<string>();

  const uploadButtonHandler = () => {
    if (!inputRef || !inputRef.current) return;

    inputRef.current.click();
  };

  const fileChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) {
      setLabel(undefined);
      return;
    }

    const chosenFile: File = event.target.files[0];
    setLabel(chosenFile.name);
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
      {label ? <span className="file-input__label">{label}</span> : <></>}
    </span>
  );
};

export default FileInput;
