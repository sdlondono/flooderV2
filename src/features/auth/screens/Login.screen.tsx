import React from 'react';
import LoginContainer from '@/features/auth/containers/Login.container';

const LoginScreen = () => {
  console.log('Test', import.meta.env);
  return (
    <main className="flex h-full items-center justify-center">
      <LoginContainer />
    </main>
  );
};

export default LoginScreen;
