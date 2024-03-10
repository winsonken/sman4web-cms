import React from 'react';

const LoadingTable = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-16 bg-gray-300 rounded-t-md animate-pulse" />
      <div className="w-full h-10 bg-gray-300 animate-pulse" />
      <div className="w-full h-10 bg-gray-300 animate-pulse" />
      <div className="w-full h-10 bg-gray-300 animate-pulse" />
      <div className="w-full h-10 bg-gray-300 animate-pulse" />
      <div className="w-full h-10 bg-gray-300 animate-pulse" />
      <div className="w-full h-10 bg-gray-300 animate-pulse" />
    </div>
  );
};

export default LoadingTable;
