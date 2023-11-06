import { io } from "socket.io-client";

export const socket = io("http://chat.amezirmessaoud.fr", {
    autoConnect: false,
});

socket.onAny((event, ...args) => {
    console.log("event received", event, args);
});
