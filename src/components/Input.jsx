import React from 'react';

const Input = (props) => {
  const {
    type,
    label,
    name,
    id,
    value,
    register,
    onChange,
    className,
    disabled,
    errors,
  } = props;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id || name}
        className="text-sm font-medium text-second-blue"
      >
        {label || 'Label'}
      </label>

      <input
        type={type || 'text'}
        name={name || ''}
        id={id || name}
        placeholder={label || 'Input'}
        value={value}
        min="0"
        className={`w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded placeholder:text-main-cream focus:outline-0 caret-second-blue ${className}`}
        onChange={onChange}
        {...(register && register(name))}
        disabled={disabled || ''}
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
