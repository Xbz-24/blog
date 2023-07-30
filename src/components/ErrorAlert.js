import React from 'react';

const ErrorAlert = ({ message }) => {
  return (
    <div>
      <p>Error: {message}</p>
    </div>
  );
};

export default ErrorAlert;
