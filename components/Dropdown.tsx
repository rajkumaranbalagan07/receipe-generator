import React, { useState } from 'react';

export type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: Option[];
  onSelect: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <select
      value={selectedOption}
      onChange={handleChange}
      className="border rounded-md px-3 py-2 text-lg"
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
