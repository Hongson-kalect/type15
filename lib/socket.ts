"use client";

import { io } from "socket.io-client";

export const socket = io(`:3334`, {
  path: "/api/socket",
  addTrailingSlash: false,
});
