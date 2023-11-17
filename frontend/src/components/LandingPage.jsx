import React from 'react';

const LandingPage = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/signin';
  };

  const handleSignUp = () => {
    window.location.href = 'http://localhost:3000/auth/signup';
  };

  return (
    <div
      className='flex'
      style={{
        height: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <span style={{ fontSize: '28px' }}>
          {' '}
          Semantic Search - Document Management System (DMS)
        </span>
        <div
          style={{
            padding: '20px',
          }}
        >
          <ul className='flex justify-center items-center space-x-10'>
            <li>
              <button
                style={{
                  backgroundColor: '#c9c9c9',
                  padding: '15px',
                  fontWeight: 500,
                }}
                onClick={handleLogin}
              >
                Login
              </button>
            </li>
            <li>
              <button
                style={{
                  backgroundColor: '#c9c9c9',
                  padding: '15px',
                  fontWeight: 500,
                }}
                onClick={handleSignUp}
              >
                SignUp
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
