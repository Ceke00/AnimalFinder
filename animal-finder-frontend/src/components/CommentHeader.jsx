import React from "react";
import { FaRegSmile } from "react-icons/fa";
import { avatars } from "../avatars";

//Showing avatar and user name for comment header
const CommentHeader = ({ comment, animalUserId }) => {
  return (
    <div className="mb-3">
      <span className="me-2" aria-hidden>
        {comment.avatarUrl ? (
          avatars
            .find((avatar) => avatar.url === comment.avatarUrl)
            ?.icon(30) || <FaRegSmile className="smile" size={30} />
        ) : (
          <FaRegSmile className="smile" size={30} />
        )}
      </span>
      <span>
        <strong>
          {comment.firstName} {comment.lastName}
          {comment.userId === animalUserId && <span> (owner)</span>}
        </strong>
      </span>
    </div>
  );
};

export default CommentHeader;
