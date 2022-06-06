import React from "react";

export const UnlabeledInput = () => {
  return <input type="text" placeholder="Search" />;
};

// Make this a conditional for the type, then just drill the props in :clown
export const LabeledInput = ({
  placeholder,
  type,
  label,
  description,
  onChange,
}) => {
  switch (type) {
    case "number":
      return (
        <label>
          <p>
            {label} <span>{description}</span>
          </p>
          <input
            type="number"
            placeholder={placeholder}
            required
            onChange={onChange}
            // Wonky logic here
            step="0.01"
          />
        </label>
      );
    case "text":
    case "url":
    default:
      return (
        <label>
          <p>
            {label} <span>{description}</span>
          </p>
          <input
            type={type}
            placeholder={placeholder}
            required
            onChange={onChange}
          />
        </label>
      );
  }
};

// Textarea
export const TextArea = ({ onChange }) => {
  return (
    <label htmlFor="">
      <p>Snap Description (Up to 1000 Characters)</p>
      <textarea
        required
        maxLength="1000"
        name="description"
        onChange={onChange}
      />
    </label>
  );
};
