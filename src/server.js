import { io } from "socket.io-client";
const socket = io("http://localhost:5001", {
  forceNew: true,
  reconnectionAttempts: 5,
  timeout: 10000,
});
export default socket;
