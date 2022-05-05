import React from "react";
import Image from "next/image";
import { truncateComment } from "utils/truncateText";

export default function CommentCard({ comments = [] }) {
  if (comments.length === 0) return <></>;
  const comment = comments.find((comment) => comment.image.length > 0);

  return (
    <div className="flex flex-col md:flex-row w-full">
      <Image src={comment.image} width="1080" height="720" alt="logly social" />

      <div className="overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">
            {truncateComment(comment.comment)}
          </p>
        </div>
      </div>
    </div>
  );
}
