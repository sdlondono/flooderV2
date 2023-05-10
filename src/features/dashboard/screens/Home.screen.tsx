import React, { useEffect } from 'react';

const HomeScreen = () => {
  useEffect(() => {
    const localStream = navigator.mediaDevices.getUserMedia({ video: false, audio: true });
    console.log(localStream);
  }, []);
  return <div>HomeScreen</div>;
};

export default HomeScreen;
