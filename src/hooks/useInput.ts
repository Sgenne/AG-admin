import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState<string>();
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const onChange = (newValue: string) => {
    setIsTouched(true);
    setValue(newValue);
  };

  return {
    value: value,
    isTouched: isTouched,
    onChange: onChange,
  };
};

export default useInput;
