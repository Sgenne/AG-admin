import { ChangeEvent } from "react";
import "../../css/UI/Select.css";

interface ISelectProps {
  options: string[];
  onChange: (currentValue: string) => void;
  label?: string;
}

const Select = ({ options, onChange, label }: ISelectProps) => {
  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    if (!event.target) return;

    onChange(event.target.value);
  };

  const displayedOptions = options.map((option) => (
    <option value={option} key={option}>
      {option}
    </option>
  ));

  return (
    <select
      defaultValue={"DEFAULT"}
      className="select"
      onChange={changeHandler}
    >
      {label && (
        <option value={"DEFAULT"} disabled>
          {label}
        </option>
      )}
      {displayedOptions}
    </select>
  );
};

export default Select;
