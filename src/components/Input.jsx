import React from 'react';

const Input = (props) => {
  const {
    type,
    label,
    name,
    id,
    placeholder,
    value,
    register,
    onChange,
    className,
    min,
    max,
    disabled,
    errors,
  } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-second-blue">
        {label || 'Label'}
      </label>

      <input
        type={type || 'text'}
        name={name}
        id={name}
        {...(register && register(name))}
        placeholder={label || placeholder}
        value={value}
        min={min || '0'}
        max={max}
        className={`w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded placeholder:text-main-cream focus:outline-0 caret-second-blue ${className}`}
        onChange={onChange}
        disabled={disabled}
      />

      {errors?.[name]?.message && (
        <span className="text-xs font-medium text-main-red">
          {errors?.[name]?.message}
        </span>
      )}
    </div>
  );
};

export default Input;
