import React from "react";
import "./Input.scss";

export default function Input(props) {
  const {
    type,
    name,
    placeholder,
    onChange,
    value,
    error,
    maxLength,
    ref,
    forUserName,
    onKeyDown,
    onKeyDownCapture
  } = props;
  return (
    <div className="inputContainer">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onKeyDown={onKeyDown}
        onKeyDownCapture={onKeyDownCapture}
      />
      {error ? (
        <span className="error">{error}</span>
      ) : (
        forUserName && <span className="error">{forUserName}</span>
      )}
    </div>
  );
}

export const TextArea = (props) => {
  const { name, placeholder, onChange, value, customClass, error } = props;

  return (
    <div className="input-field">
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        rows="50"
        name={name}
        id={name}
        cols="40"
        className={customClass}
        autocomplete="off"
        role="textbox"
      ></textarea>
      {error && <span className="error">{error}</span>}
    </div>
  );
};
