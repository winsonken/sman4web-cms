import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-center mt-64 font-semibold text-6xl text-red-500">
        Error!!!
      </h1>
      <h1 className="text-center font-semibold text-3xl">Page Error</h1>
      <div className="flex flex-col sm:flex-row sm:justify-center gap-3">
        <button
          className="max-w-xl h-fit  text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded"
          as={Link}
          to={'/dashboard'}
        >
          <div className="flex justify-center">
            <IoIosArrowBack className="text-xl" /> Back
          </div>
        </button>
      </div>
    </div>
  );
};

export default Error;
