import React from "react";

const InputField = ({ type, name, id, placeholder, required, value, onChange, disabled }) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange} 
        className="bg-secondary border border-gray-300 text-gray-900 mb-8 sm:text-md rounded-full focus:ring-inset focus:border-red-50 block w-full px-4 py-2.5 focus:outline-double"
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};

export default InputField;
