import { db } from '@/firebase/config';
import { ref, child, push, onValue, get, set } from 'firebase/database';

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
    }
  ],
  iceCandidatePoolSize: 10
};
// Global states
const pc = new RTCPeerConnection(servers);
let localStream: MediaStream | null = null;
let remoteStream: MediaStream | null = null;

export const initializeConnection = async (
  refLocalVideo: React.RefObject<HTMLVideoElement>,
  refRemoteVideo: React.RefObject<HTMLVideoElement>
) => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  remoteStream = new MediaStream();

  // Push tracks from local stream to peer connection
  localStream.getTracks().forEach((track) => {
    if (!localStream) return;
    console.log('Into here', track);
    pc.addTrack(track, localStream);
  });

  // Pull tracks from remote stream, add to video stream
  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      if (!remoteStream) return;
      remoteStream.addTrack(track);
    });
  };

  if (!refLocalVideo.current || !refRemoteVideo.current) return;

  refLocalVideo.current.srcObject = localStream;
  refRemoteVideo.current.srcObject = remoteStream;
};

export const createOffer = async (userName: string) => {
  const callsRef = ref(db, 'calls');
  const offerCandidates = child(callsRef, 'offerCandidates');
  const answerCandidates = child(callsRef, 'answerCandidates');

  // Get candidates for caller, save to db
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      console.log('Candidates for caller saved to db');
      set(offerCandidates, event.candidate.toJSON());
    }
  };

  // Create offer
  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type
  };

  // TODO: Create offer by id using (push)
  await set(child(callsRef, 'offer'), offer);

  // Listen for remote answer
  onValue(callsRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    if (!pc.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  // When answered, add candidate to peer connection
  onValue(answerCandidates, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      console.log('add candidate to peer connection', data);
      pc.addIceCandidate(new RTCIceCandidate(data));
    }
  });
};

export const createAnswer = async (userToCall: string) => {
  const callsRef = ref(db, 'calls');
  const offerCandidates = child(callsRef, 'offerCandidates');
  const answerCandidates = child(callsRef, 'answerCandidates');

  pc.onicecandidate = (event) => {
    console.log('Into here');
    event.candidate && set(answerCandidates, event.candidate.toJSON());
  };

  // TODO: Get offer by offerID
  const calls = (await get(callsRef)).toJSON() as { offer: RTCSessionDescriptionInit };
  if (!calls) return;
  const offerDescription = calls.offer;
  await pc.setRemoteDescription(offerDescription);

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp
  };

  await set(child(callsRef, 'answer'), answer);

  onValue(offerCandidates, (snapshot) => {
    console.log('offerCandidates snapshot', snapshot.val());
    const offersByCandidates = snapshot.val();
    if (offersByCandidates) {
      pc.addIceCandidate(new RTCIceCandidate(offersByCandidates));
    }
  });
};
