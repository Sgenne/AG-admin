import { ChangeEvent } from "react";
import "../../css/UI/Select.css";

interface ISelectProps {
  options: string[];
  onChange: (currentValue: string) => void;
}

const Select = ({ options, onChange }: ISelectProps) => {
  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    if (!event.target) return;

    onChange(event.target.value);
  };

  const displayedOptions = options.map((option) => (
    <option key={option}>{option}</option>
  ));

  return (
    <select className="select" onChange={changeHandler}>
      {displayedOptions}
    </select>
  );
};

export default Select;
