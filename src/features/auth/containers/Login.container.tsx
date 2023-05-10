import React, { useEffect } from 'react';
import LoginComponent from '@/features/auth/components/Login.component';
import { doLogin } from '@/firebase/firebaseModules';
import { initializeConnection, createOffer, createAnswer } from '@/modules/RTCModule';

const LoginContainer = () => {
  const [userName, setUserName] = React.useState('');
  const [userNameToCall, setUserNameToCall] = React.useState('');
  const refLocalVideo = React.useRef<HTMLVideoElement>(null);
  const refRemoteVideo = React.useRef<HTMLVideoElement>(null);

  const onCall = async () => {
    await createOffer(userName);
  };
  const onWebCam = async () => {
    await initializeConnection(refLocalVideo, refRemoteVideo);
  };
  const onAnswer = async () => {
    await createAnswer(userNameToCall);
  };

  return (
    <LoginComponent
      setUserNameToCall={setUserNameToCall}
      setUserName={setUserName}
      onCall={onCall}
      onAnswer={onAnswer}
      onWebCam={onWebCam}
      refLocalVideo={refLocalVideo}
      refRemoteVideo={refRemoteVideo}
    />
  );
};

export default LoginContainer;
