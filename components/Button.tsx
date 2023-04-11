import React from 'react';

type ButtonProps = {
  onClick: () => void;
  children: any;
  disabled:any
};

const Button: React.FC<ButtonProps> = ({ onClick, children,disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
};

export default Button;
