import React from 'react';
import { IoSearch } from 'react-icons/io5';

const SearchFilter = (props) => {
  const { placeholder } = props;
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder || 'Search'}
        className="w-full text-main-cream  bg-main-blue pl-10 pr-3  py-2 rounded placeholder:text-main-cream focus:outline-0 caret-second-blue"
      />
      <div className="px-3 py-2 absolute top-1/2 left-0 -translate-y-1/2">
        <IoSearch className="text-xl text-main-cream" />
      </div>
    </div>
  );
};

export default SearchFilter;
