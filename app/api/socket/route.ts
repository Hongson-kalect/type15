import { NextResponse } from "next/server";
import type { Server as IOServer } from "socket.io";
import { Server } from "socket.io";

declare global {
  var _io: IOServer | undefined;
}

export async function GET() {
  if (global._io) {
    return NextResponse.json({
      success: true,
      message: "Socket is already running",
      socket: `:${3334}`,
    });
  }

  console.log("Starting Socket.IO server on port:", 3334);

  const io = new Server({
    path: "/api/socket",
    addTrailingSlash: false,
    cors: { origin: "*" },
  }).listen(3334);

  io.on("connect", (socket) => {
    console.log("socket connect", socket.id);
    socket.broadcast.emit("welcome", `Welcome ${socket.id}`);
    socket.on("disconnect", () => {
      console.log("socket disconnect");
    });

    socket.on("message", (msg) => {
      console.log("what", msg);
      io.emit("message", msg);
    });
  });

  global._io = io;

  return NextResponse.json(
    { success: true, message: "Socket is started", socket: `:${3334}` },
    {
      status: 200,
    }
  );
}
