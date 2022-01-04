import "../../css/UI/Input.css";

interface IInputProps {
  value: string;
  onChange: (newValue: string) => void;
  type?: string;
  name?: string;
  id?: string;
  error?: boolean;
}

const Input = ({
  value,
  onChange,
  type = "text",
  name = "input",
  id,
  error = false,
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
    />
  );
};

export default Input;
