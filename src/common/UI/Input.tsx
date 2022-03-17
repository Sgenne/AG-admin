import { KeyboardEvent } from "react";
import "../CSS/Input.css";


interface IInputProps {
  value: string;
  onChange: (newValue: string) => void;
  type?: string;
  name?: string;
  id?: string;
  error?: boolean;
  onKeyDown?: (event: KeyboardEvent) => void;
  autoFocus?: boolean;
}

const Input = ({
  value,
  onChange,
  type = "text",
  name = "input",
  id,
  error = false,
  onKeyDown,
  autoFocus,
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
      autoFocus={autoFocus}
    />
  );
};

export default Input;
