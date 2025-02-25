import { MessageType } from "@/interface/socket/type";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import type { Server as IOServer } from "socket.io";
import { Server } from "socket.io";

declare global {
  var _io: IOServer | undefined;
}

const prisma = new PrismaClient();

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

    socket.on("join", (room) => {
      socket.join(room);
      // io.to(room).emit("message", `User ${socket.id} joined room ${room}`); // send info that have someone just join room
    });
    socket.on("leave", (room) => {
      socket.leave(room);
      // io.to(room).emit("message", `User ${socket.id} left room ${room}`); // send info that have someone just leave room
    });

    socket.on("message", async (room, msg: MessageType) => {
      const comment = await prisma.comment.create({
        data: {
          userId: msg.userId,
          content: msg.content,
          [msg.targetField]: msg.targetColumn,
          createdAt: msg.createdAt,
        },
      });

      io.to(room).emit("message", comment);
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
