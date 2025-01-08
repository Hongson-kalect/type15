"use client";

import { Button } from "@/components/ui/button";
// import { socket } from "@/lib/socket";
import { Heart, ThumbsUp } from "lucide-react";
import * as React from "react";
import { io } from "socket.io-client";

export interface IParaOptionsProps {}

export default function ParaOptions(props: IParaOptionsProps) {
  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<string[]>([]);
  const [socket] = React.useState(
    io(`:3334`, {
      path: "/api/socket",
      addTrailingSlash: false,
    })
  );

  const [transport, setTransport] = React.useState("N/A");

  const [isConnected, setIsConnected] = React.useState(socket.connected);
  const socketInitializer = async () => {
    await fetch("/api/socket");
  };

  React.useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    socketInitializer();

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    function onMessage(msg: string) {
      setMessages((prev) => [...prev, msg]);
    }

    socket.on("connect", onConnect);
    socket.on("message", onMessage);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("message", onMessage);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 overflow-auto">
      <div className="flex gap-4 justify-between items-center">
        <p className="font-medium text-xl">Comment</p>
        <div className="flex justify-between items-center gap-4">
          <Button>
            <ThumbsUp /> 10k
          </Button>
          <Button className="!bg-red-500 hover:!bg-red-600 duration-200">
            <Heart /> 20k
          </Button>
        </div>
      </div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <p>message: {message}</p>

      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          onClick={(e) => {
            socket.emit("message", message);
            console.log("message", message);
            setMessages((prev) => [...prev, message]);
            setMessage("");
          }}
        >
          Send
        </Button>
      </div>
      <p>messages: {JSON.stringify(messages)}</p>

      <div>Chuwa cos binhf luaanj</div>
    </div>
  );
}
