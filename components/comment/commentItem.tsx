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
    <div
      className={` py-2 px-3 rounded-xl shadow ${
        comment.userId === userInfo.id ? "bg-blue-50" : "bg-gray-50"
      }`}
    >
      <div className="flex gap-2 items-center mb-4">
        <div className="rounded-full flex items-center justify-center font-medium">
          <div className="uppercase">
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
          <div className={`flex-1 px-3`}>
            <div className="flex items-center gap-2">
              <p className="font-medium">
                {comment.userId === userInfo.id
                  ? "You"
                  : comment.user?.user?.name || "Nêm"}
              </p>
              <div>-</div>
              <p className="text-sm text-gray-600">
                {relativeDate(new Date(comment.createdAt))}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className=" text-gray-800 text-sm ml-1">{comment.content}</p>
    </div>
  );
}
