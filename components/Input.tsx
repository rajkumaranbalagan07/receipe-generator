import { useState } from "react";

type Props = {
  onButtonClick: (value: string) => void;
};

function Input({ onButtonClick }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <input type="text" className="border rounded-md px-3 py-2 text-lg" 
    value={inputValue} onChange={handleInputChange} 
    placeholder="eg: within 10 mins, using 4 egg, using gas"
    />
  );
}

export default Input;
