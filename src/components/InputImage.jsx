import React, { useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';

const InputImage = (props) => {
  const {
    label,
    imageValue,
    setImageValue,
    selectedImage,
    setSelectedImage,
    onChange,
    errors,
  } = props;

  const handleRemoveFile = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedImage('');
    setImageValue('');
  };
  return (
    <div className="flex flex-col gap-1 w-full h-full">
      <label htmlFor="" className="text-sm font-medium text-second-blue">
        {label || 'Foto'}
      </label>
      <div className="w-full h-full">
        <label
          htmlFor="image"
          className={`flex flex-col justify-center items-center gap-2 w-full h-full min-h-[100px] text-main-blue font-medium rounded border-dotted border-main-blue border-2 ${
            selectedImage ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          {selectedImage || imageValue ? (
            <div className="flex justify-center items-center max-h-[100px] w-full h-full relative">
              <img
                src={
                  imageValue
                    ? `http://localhost:5500/${imageValue}`
                    : URL.createObjectURL(selectedImage)
                }
                alt=""
                className="w-full h-full object-cover"
              />
              <div
                className="absolute top-1 right-1 cursor-pointer bg-main-blue rounded-full p-0.5"
                onClick={handleRemoveFile}
              >
                <p className="text-3xl text-main-cream">
                  <IoClose />
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-row items-center gap-2">
                <IoCloudUploadOutline className="text-3xl" />
                <p>Upload foto</p>
              </div>

              <p className="text-xs font-normal">JPG/JPEG/PNG Max 2 mb</p>
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={onChange}
              />
            </>
          )}
        </label>
      </div>
    </div>
  );
};

export default InputImage;
