"use client";

import CommentItem from "@/components/comment/commentItem";
import { Button } from "@/components/ui/button";
import { IComment } from "@/interface/schema/schema.interface";
import { MessageType } from "@/interface/socket/type";
import { AddCommentType } from "@/interface/type/comment";
import { UserActionState } from "@/interface/type/paragraph";
import { joinRoom, leaveRoom, socket } from "@/lib/socket";
import { relativeDate } from "@/lib/utils";
import {
  getParagraphComment,
  getParagraphUserActionState,
  paragraphUserAction,
} from "@/services/paragraph.service";
import { mainLayoutStore } from "@/store/mainLayout.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Heart, LoaderCircle, ThumbsUp } from "lucide-react";
import * as React from "react";
import { data } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export interface IParaOptionsProps {
  id: number;
}

export default function ParaOptions({ id }: IParaOptionsProps) {
  const { userInfo } = mainLayoutStore();
  const [transport, setTransport] = React.useState("N/A");
  const [isConnected, setIsConnected] = React.useState(socket.connected);

  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<IComment[]>([]);
  // const [userActionState, setUserActionState] = React.useState<UserActionState|null>(null);

  const {
    data: initComment,
    error: commentError,
    isLoading: commentLoading,
  } = useQuery<IComment[]>({
    queryKey: ["initComment"],
    queryFn: () => getParagraphComment({ paragraphId: id }),
  });

  const {
    data: userActionState,
    error: userActionError,
    isLoading: userActionLoading,
    refetch: refetchUserAction,
  } = useQuery<UserActionState>({
    queryKey: ["userActionState"],
    queryFn: async () => await getParagraphUserActionState({ paragraphId: id }),
  });

  const {
    mutate: userAction,
    error,
    isLoading,
  } = useMutation<
    { message: string },
    Error,
    {
      action: "like" | "favorite" | "report";
      state: boolean;
      paragraphId: number;
      userId: number;
    }
  >({
    mutationKey: ["getUserActions"],
    mutationFn: async ({
      action,
      state,
    }: {
      action: "like" | "favorite" | "report";
      state: boolean;
    }) =>
      await paragraphUserAction({
        paragraphId: id,
        action,
        state,
        userId: userInfo.id,
      }),
    onSuccess: () => {
      refetchUserAction();
    },
    onError: (error) => {
      toast.error("Failed to get user action state");
      console.log("get user action error", error);
    },
  });

  const handleLike = () => {
    if (isLoading) return toast.error("Please wait...");
    if (!userInfo.id) return toast.error("Login to use this function");

    userAction({
      action: "like",
      state: !userActionState?.isLiked,
      paragraphId: id,
      userId: userInfo.id,
    });
  };
  const handleFavorite = () => {
    if (isLoading) return toast.error("Please wait...");
    if (!userInfo.id) return toast.error("Login to use this function");
    userAction({
      action: "favorite",
      state: !userActionState?.isFavorited,
      paragraphId: id,
      userId: userInfo.id,
    });
  };

  React.useEffect(() => {
    if (initComment) {
      const reverseComment = initComment.reverse();
      setMessages([...reverseComment]);
    }
  }, [initComment]);

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInfo.id || !socketRoom)
      return toast.error("Login to use this function");
    const comment: MessageType = {
      content: message,
      userId: userInfo.id,
      targetField: "paragraphId",
      targetColumn: id,
      createdAt: new Date(),
      state: "sending",
    };

    socket.emit("message", socketRoom, comment);
    setMessages((prev) => [...prev, comment]);
    setMessage("");
  };

  //Socket connection
  const socketRoom = React.useMemo(() => {
    return id ? "paragraphId-" + id : "";
  }, [id]);
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

    function onMessage(msg: IComment) {
      // if (msg.userId === userInfo.id) return;\
      //dùng như này vì cái message ko nhận biến state thay đổi (luôn nhận mặc định), nên phải lây thông qua setMessages
      setMessages((messages) => {
        const sending = messages.find(
          (m) => {
            return (
              new Date(m.createdAt).getTime() ===
                new Date(msg.createdAt).getTime() && m.userId === userInfo.id
            );
          } // Thời gian và người gửi bằng nhau
        );
        if (sending) {
          if (sending.state === "sending") sending.state = "success";
          return [...messages];
        }
        return [...messages, msg];
      });
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

  React.useEffect(() => {
    if (socketRoom) joinRoom(socketRoom);
    return () => {
      leaveRoom(socketRoom);
    };
  }, [socketRoom]);

  return (
    <div className="bg-white rounded-xl p-4 overflow-auto">
      <div className="flex gap-4 justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="font-medium text-xl">Comment</div>
          <div
            className={`connection ${
              isConnected ? "bg-green-500" : "bg-red-500"
            } w-4 h-4 rounded-full animate-pulse duration-[12000]`}
          ></div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <Button
            onClick={handleLike}
            variant={userActionState?.isLiked ? "default" : "ghost"}
          >
            <ThumbsUp />
            <div className="w-4">
              {!userActionLoading ? (
                userActionState?.like
              ) : (
                <div className="animate-spin">
                  <LoaderCircle />
                </div>
              )}
            </div>
          </Button>
          <Button
            onClick={handleFavorite}
            // className="!bg-red-500 hover:!bg-red-600 duration-200"
            variant={userActionState?.isFavorited ? "destructive" : "ghost"}
          >
            <Heart />
            <div className="w-4">
              {!userActionLoading ? (
                userActionState?.favorite
              ) : (
                <div className="animate-spin">
                  <LoaderCircle />
                </div>
              )}
            </div>
          </Button>
        </div>
      </div>

      <div className="mt-4">
        {messages.map((msg, index) => (
          <CommentItem key={index} comment={msg} />
        ))}
      </div>
      <form onSubmit={(e) => handleComment(e)} className="mt-8">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border rounded p-2 w-full"
          placeholder="Type your message..."
        />
        <Button type="submit" className="mt-2">
          Send
        </Button>
      </form>
    </div>
  );
}
