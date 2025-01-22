import Image from "next/image";
import * as React from "react";

import { IComment } from "@/interface/schema/schema.interface";
import { relativeDate } from "@/lib/utils";
// import { relativeDate } from "@/assets/images/default-avatar.jfif";
import { mainLayoutStore } from "@/store/mainLayout.store";
import defaultAvatar from "@/assets/images/default-avatar.jpg";

export interface ICommentItemProps {
  comment: IComment;
}

export default function CommentItem({ comment }: ICommentItemProps) {
  const { userInfo } = mainLayoutStore();
  return (
    <div className={`flex gap-2 mb-4`}>
      <div className="h-8 w-8 border-2 bg-white rounded-full flex items-center justify-center font-medium uppercase">
        {comment.userId === userInfo.id ? (
          <Image
            src={userInfo.user?.image || defaultAvatar}
            alt="Avatar"
            width={28}
            height={28}
            className="w-7 h-7 rounded-full"
          />
        ) : comment?.user?.user?.image ? (
          <Image
            src={comment?.user?.user?.image || defaultAvatar}
            alt="Avatar"
            width={28}
            height={28}
            className="w-7 h-7 rounded-full"
          />
        ) : (
          comment.user?.user?.name?.charAt(0) || "N"
        )}
      </div>
      <div
        className={`flex-1 pt-2 px-3 rounded-xl shadow ${
          comment.userId === userInfo.id ? "bg-blue-100" : "bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm">
            {comment.userId === userInfo.id
              ? "You"
              : comment.user?.user?.name || "Nêm"}
          </p>
          <p className="text-xs text-gray-400 pl-1">
            {relativeDate(new Date(comment.createdAt))}
          </p>
        </div>
        <p className=" text-gray-700 text-sm">{comment.content}</p>
      </div>
    </div>
  );
}
