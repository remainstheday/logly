import React from "react";
import Image from "next/image";
import { truncateComment } from "utils/truncateText";

export default function CommentCard({ comment }) {
  if (!comment) return <></>;
  return (
    <div className="flex flex-row">
      {comment.image && (
        <Image
          src={comment.image}
          width="290"
          height="290"
          alt={comment.comment}
        />
      )}
      <div className="overflow-hidden shadow-lg w-1/2">
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">
            {truncateComment(comment.comment)}
          </p>
        </div>
      </div>
    </div>
  );
}
