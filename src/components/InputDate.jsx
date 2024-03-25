import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';

const InputDate = (props) => {
  const {
    label,
    name,
    value,
    placeholder,
    onChange,
    dateFormat,
    showYearPicker,
    field,
    errors,
  } = props;

  const convertValue = value?.toString();
  return (
    <div className="flex flex-col gap-1 relative">
      <label htmlFor="" className="text-sm font-medium text-second-blue">
        {label || 'Input'}
      </label>

      <div className="flex flex-col relative">
        <DatePicker
          selected={convertValue || field.value}
          onChange={onChange}
          className="w-full text-sm font-medium text-main-cream  bg-main-blue pl-9 pr-3 py-2 rounded placeholder:text-main-cream focus:outline-0"
          placeholderText={placeholder || 'Select date'}
          dateFormat={dateFormat || 'yyyy/MM/dd'}
          showYearPicker={showYearPicker}
          withPortal
        />
        <div className="px-2 py-2 absolute top-1/2 left-0 -translate-y-1/2">
          <FaCalendarAlt className="text-second-blue" />
        </div>
      </div>

      {errors?.[name]?.message && (
        <span className="text-xs font-medium text-main-red">
          {errors?.[name]?.message}
        </span>
      )}
    </div>
  );
};

export default InputDate;
