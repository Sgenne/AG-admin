import { KeyboardEvent } from "react";
import "../../css/UI/Input.css";

interface IInputProps {
  value: string;
  onChange: (newValue: string) => void;
  type?: string;
  name?: string;
  id?: string;
  error?: boolean;
  onKeyDown?: (event: KeyboardEvent) => void;
}

const Input = ({
  value,
  onChange,
  type = "text",
  name = "input",
  id,
  error = false,
  onKeyDown,
}: IInputProps) => {
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <input
      className={`input ${error ? "input--error" : ""}`}
      value={value}
      type={type}
      name={name}
      onChange={changeHandler}
      id={id}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
