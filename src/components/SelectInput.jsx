import React from 'react';
import Select from 'react-select';

const SelectInput = (props) => {
  const {
    type,
    label,
    name,
    id,
    placeholder,
    data,
    value,
    register,
    onChange,
    className,
    field,
    disabled,
    errors,
  } = props;

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#7FC7D9',
      outline: 'none',
      border: 'none',
      boxShadow: 'none',
      padding: '2px',
    }),
    container: (provided) => ({
      ...provided,
      minHeight: '100%',
      height: '100%',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#FFFDDE',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#FFFDDE',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#FFFDDE',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: '#FFFDDE',
    }),
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id || name}
        className="text-sm font-medium text-second-blue"
      >
        {label || 'Label'}
      </label>

      <Select
        {...field}
        options={data || ''}
        placeholder={placeholder}
        styles={customStyles}
      />

      {errors?.[name]?.message && (
        <span className="text-xs font-medium text-main-red">
          {errors?.[name]?.message}
        </span>
      )}
    </div>
  );
};

export default SelectInput;
