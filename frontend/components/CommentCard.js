import React from "react";
import { truncateComment } from "utils/truncateText";
import { format } from "date-fns";

export default function CommentCard({ comment }) {
  if (!comment) return <></>;
  const imageSource =
    comment.image.length > 0 ? comment.image : "/stock-museum-2.jpg";

  return (
    <div className="max-w-sm my-8 rounded overflow-hidden shadow-lg">
      <img className="w-full" src={imageSource} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
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
      {comment.query.length > 0 && (
        <div className="px-6 pt-4 pb-2">
          {Object.values(comment.query).map((item) => (
            <span
              key={item.id}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
