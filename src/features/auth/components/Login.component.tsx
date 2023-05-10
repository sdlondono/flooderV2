import React from 'react';
import { Link } from 'react-router-dom';

interface LoginComponentProps {
  setUserNameToCall: React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  onCall: () => void;
  onAnswer: () => void;
  onWebCam: () => void;
  refLocalVideo: React.RefObject<HTMLVideoElement>;
  refRemoteVideo: React.RefObject<HTMLVideoElement>;
}

const LoginComponent: React.FC<LoginComponentProps> = ({
  setUserNameToCall,
  setUserName,
  onCall,
  onAnswer,
  onWebCam,
  refLocalVideo,
  refRemoteVideo
}) => {
  return (
    <article className="flex flex-col gap-3">
      <div className="flex">
        <span>
          <h1>Video llamada local</h1>
          <video ref={refLocalVideo} autoPlay playsInline></video>
        </span>
        <span>
          <h1>Video llamada remoto</h1>
          <video ref={refRemoteVideo} autoPlay playsInline></video>
        </span>
      </div>
      <input placeholder="Usuario" className="p-2" onChange={(e) => setUserName(e.target.value)} />
      <input placeholder="Usuario a llamar" className="p-2" onChange={(e) => setUserNameToCall(e.target.value)} />
      <button className="bg-yellow-400 text-white text-lg p-2" onClick={onWebCam}>
        Comenzar llamada
      </button>
      {/* <input placeholder="Contraseña" className="p-2" /> */}
      <button className="bg-yellow-400 text-white text-lg p-2" onClick={onCall}>
        Crear Oferta
      </button>
      <button className="bg-yellow-400 text-white text-lg p-2" onClick={onAnswer}>
        Crear Respuesta
      </button>
      <p className="text-white text-sm">
        Necesitas una cuenta?{' '}
        <Link to="/register" className="text-yellow-300">
          Registrar
        </Link>
      </p>
    </article>
  );
};

export default LoginComponent;
