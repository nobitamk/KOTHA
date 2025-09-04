import React from 'react';

const Topbar = () => {
  return (
    <div style={{
      background: '#fff',
      padding: '10px 20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <strong>📅 Today is: </strong> {new Date().toDateString()}
    </div>
  );
};

export default Topbar;
