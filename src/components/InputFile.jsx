import React from 'react';
import { IoClose } from 'react-icons/io5';
import { FaFileLines } from 'react-icons/fa6';

const InputFile = (props) => {
  const {
    label,
    name,
    onChange,
    fileValue,
    setFileValue,
    selectedFile,
    setSelectedFile,
  } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="" className="text-sm font-medium text-second-blue">
        {label || 'Upload file'}
      </label>

      <div className="relative">
        {fileValue || selectedFile ? (
          <div className="relative">
            <FaFileLines className="text-3xl text-second-blue absolute top-1/2 left-0 -translate-y-1/2 pl-3" />
            <input
              type="text"
              value={fileValue ? fileValue?.split('/')[1] : selectedFile?.name}
              disabled
              className="w-full bg-main-blue text-main-cream rounded-md py-2 pl-10 pr-3"
            />

            <IoClose
              className="text-3xl text-black absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer"
              onClick={() => {
                setFileValue('');
                setSelectedFile('');
              }}
            />
          </div>
        ) : (
          <input
            type="file"
            id={name}
            name={name}
            className="w-full bg-main-blue rounded-md file:rounded-l-md file:border-0 file:py-2 file:bg-second-blue file:text-main-cream file:px-3 file:cursor-pointer cursor-pointer"
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};

export default InputFile;
