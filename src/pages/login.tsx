import React from 'react';
import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <div>
      Welcome to Finanzo!
      <button onClick={async () => await signIn('google')}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
