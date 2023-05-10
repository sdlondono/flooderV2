import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginScreen from '@/features/auth/screens/Login.screen';
import HomeScreen from '@/features/dashboard/screens/Home.screen';

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<HomeScreen />} path="/" /> */}
        <Route element={<LoginScreen />} path="/" />
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
