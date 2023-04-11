import React from 'react';

type TextAreaProps = {
  value: string;
  rows:number
};

const TextArea: React.FC<TextAreaProps> = ({ value,rows }) => {
  return (
    <textarea
      value={value}
      rows={rows}
      readOnly
      className="w-full  bg-gray-100 border rounded-md p-2"
    ></textarea>
  );
};

export default TextArea;
