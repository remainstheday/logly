import React from "react";
import Image from "next/image";
import { truncateComment } from "utils/truncateText";

export default function CommentCarousel({ comments = [] }) {
  const comment = comments.find((comment) => comment.image.length > 0);
  if (comments.length < 1) return <></>;
  return (
    <div className="flex w-full">
      <Image src={comment.image} width="1080" height="720" />
      <div className="max-w-sm ml-2 rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">
            {truncateComment(comment.comment)}
          </p>
        </div>
      </div>
    </div>
  );
}
