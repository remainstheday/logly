import React from "react";
import { truncateComment } from "utils/truncateText";
import { format } from "date-fns";

export default function CommentCard({ comment }) {
  if (!comment) return <></>;

  return (
    <div className="flex content-start flex-row h-52">
      {comment.image && (
        <div className="w-1/2 overflow-hidden">
          <img
            className="object-cover"
            src={comment.image}
            width="290"
            height="290"
            alt={comment.comment}
          />
        </div>
      )}
      <div className="w-1/2">
        <div className="relative h-full mx-1 px-2 py-2 overflow-hidden shadow-lg">
          <p className="text-gray-700 text-base">
            {truncateComment(comment.comment)}
          </p>
          <span>
            <i className="text-gray-400 text-xs absolute bottom-2">
              Comment by {comment.username} <br /> on{" "}
              {comment.timestamp &&
                format(new Date(comment.timestamp), "MMM dd, yyyy")}
            </i>
          </span>
        </div>
      </div>
    </div>
  );
}
