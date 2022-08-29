import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { truncateComment } from "utils/truncateText";

export default function CommentCard({ comment }) {
  const [commentDate, setCommentDate] = useState(new Date(comment.timestamp));
  const imageSource =
    comment.image.length > 0 ? comment.image : "/images/empty-comment-illu.png"; // TODO: pass experience image
  const site = comment.query.site;
  const experience = comment.query.experience || null;
  const artifact = comment.query.artifact || null;

  useEffect(() => setCommentDate(new Date(comment.timestamp)));
  if (!comment) return <></>;
  return (
    <div className="bg-white max-w-sm my-8 mx-3 rounded overflow-hidden shadow-lg ">
      <div className="aspect-w-16 aspect-h-9">
        <img
          className={comment.image.length > 0 ? "w-full" : "w-1/2 mx-auto"}
          src={imageSource}
          alt={`social image for ${comment.query.site}`}
        />
      </div>
      <div className="flex flex-col content-between">
        <div className="px-6 py-4 flex-1">
          <p className="text-gray-700 text-base">
            {truncateComment(comment.comment)}
          </p>
          <span>
            <i className="text-gray-400 text-xs bottom-2">
              {`Comment by ${comment.username} on ${
                comment.timestamp && format(commentDate, "MMM dd, yyyy")
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
