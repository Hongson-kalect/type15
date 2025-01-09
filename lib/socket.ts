"use client";

import { io } from "socket.io-client";

export const socket = io(`:3334`, {
  path: "/api/socket",
  addTrailingSlash: false,
});

export const joinRoom = (room: string) => {
  return socket.emit("join", room);
};

export const leaveRoom = (room: string) => {
  return socket.emit("leave", room);
};
