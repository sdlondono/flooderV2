import React from 'react';
import AppBar from './AppBar';
import CustomRoutes from './routes/CustomRoutes';

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <AppBar />
      </div>
      <CustomRoutes />
    </div>
  );
};

export default App;
