import React from 'react';

const Error = (props) => {
  const { error } = props;

  return <div>Error {error && error?.error}</div>;
};

export default Error;
