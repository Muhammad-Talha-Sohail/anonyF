import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallBack } from "./useStateWithCallBack";
import socketInit from "../socket";
export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallBack([]);
  const audioElements = useRef({});
  const connections = useRef({});
  let localMediaStream = useRef(null);
  const socket = useRef(null);
  const provideRef = (instance, userId) => {
   
    audioElements.current[userId] = instance;
  };
  useEffect(() => {
    socket.current = socketInit();
  }, []);


  const addNewClients = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);
      if (lookingFor === undefined) {
        setClients((prev) => [...prev, newClient], cb);
      }
    },
    [clients, setClients]
  );

  // captureMedia
  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };


    startCapture().then(() => {
      addNewClients(user, () => {
        const localElement = audioElements.current[user._id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }
        socket.current.emit("join", {});
       
      });
    });
  }, []);

  return { clients, provideRef };
};
