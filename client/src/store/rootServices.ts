import Peer from 'peerjs';
import io from 'socket.io-client';

const IS_PROD = process.env.NODE_ENV === 'production';

export const connectSocket = () =>
  new Promise((res) => {
    const socket = io();
    socket.on('connect', () => {
      res(socket);
    });
  });

export const connectPeer = () =>
  new Promise((res) => {
    const peer = new Peer(sessionStorage.getItem('userId') || undefined, {
      secure: IS_PROD,
      host: IS_PROD ? 'app-hey.herokuapp.com' : '/',
      port: IS_PROD ? 443 : 4000,
      path: '/api/peer',
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          {
            urls: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com',
          },
        ],
      },
    });
    peer.on('open', (userId) => {
      sessionStorage.setItem('userId', userId);
      res(peer);
    });
  });
