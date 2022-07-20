import React from "react";
import { truncateComment } from "utils/truncateText";
import { format } from "date-fns";
import Link from "next/link";

export default function CommentCard({ comment }) {
  if (!comment) return <></>;
  const imageSource =
    comment.image.length > 0 ? comment.image : "/stock-museum-2.jpg";
  const site = comment.query.site;
  const experience = comment.query.experience || null;
  const artifact = comment.query.artifact || null;

  return (
    <div className="bg-white max-w-sm my-8 mx-3 rounded overflow-hidden shadow-lg ">
      <img className="w-full" src={imageSource} alt="Sunset in the mountains" />
      <div className="flex flex-col content-between">
        <div className="px-6 py-4 flex-1">
          <p className="text-gray-700 text-base">
            {truncateComment(comment.comment)}
          </p>
          <span>
            <i className="text-gray-400 text-xs bottom-2">
              {`Comment by ${comment.username} on ${
                comment.timestamp &&
                format(new Date(comment.timestamp), "MMM dd, yyyy")
              }`}
            </i>
          </span>
        </div>

        {(experience || artifact) && (
          <div className="px-6 pt-4 pb-2 flex-1">
            {experience && (
              <Link href={`/${site}/experiences/${experience}`}>
                <a>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #{experience}
                  </span>
                </a>
              </Link>
            )}
            {artifact && (
              <Link href={`/${site}/experiences/${experience}/${artifact}`}>
                <a>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #{artifact}
                  </span>
                </a>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
