import React from 'react';

function LandingPage() {
  return (
    <div
      className='flex'
      style={{
        // background: 'red',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        Semantic Search - Document Management System (DMS)
        <div
          style={{
            background: '#f0f0f0',
            padding: '20px',
          }}
        >
          <ul className='flex items-center space-x-10'>
            <li>
              <button>Login</button>
            </li>
            <li>
              <button>SignUp</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
