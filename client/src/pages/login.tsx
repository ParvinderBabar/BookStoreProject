import React from 'react';
import Login from '../Components/Login/Login';

const login = () => {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        margin: 0,
        backgroundImage: `url('/bookbg.jpg')`, // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: '#fff'
        }}
      >
        <Login />
      </div>
    </div>
  );
};

export default login;
