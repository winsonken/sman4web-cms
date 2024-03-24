import React from 'react';
import Select from 'react-select';

const SelectFilter = (props) => {
  const { data, placeholder, selectedValue, setSelectedValue } = props;

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#7FC7D9',
      outline: 'none',
      border: 'none',
      boxShadow: 'none',
      padding: '2px',
      // minHeight: '100',
    }),
    container: (provided) => ({
      ...provided,
      minHeight: '100%',
      height: '100%',
    }),
    // option: (provided, state) => ({
    //   ...provided,
    //   color: '#FFFDDE',
    // }),
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

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption?.value);
  };

  const selectedOption = data?.find((option) => option.value === selectedValue);

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' },
  // ];
  return (
    <Select
      options={data}
      placeholder={placeholder}
      styles={customStyles}
      value={selectedOption}
      onChange={handleChange}
    />
  );
};

export default SelectFilter;
