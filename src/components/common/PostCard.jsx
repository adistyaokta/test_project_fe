import React, { useState } from "react";
import axios from "axios";

const PostCard = ({ post, onEdit, onDelete }) => {
  const {
    id,
    caption,
    image,
    likes,
    tags,
    createdAt,
    user,
    liked: initialLiked,
  } = post;
  const [liked, setLiked] = useState(initialLiked || false);
  const [likeCount, setLikeCount] = useState(likes || 0);

  const handleLike = async () => {
    const storedToken = localStorage.getItem("token");

    try {
      if (liked) {
        // If post is already liked, send unlike request
        const unlikeResponse = await axios.put(
          `https://devfortest.my.id/post/unlike/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (unlikeResponse.status === 200) {
          setLiked(false);
          setLikeCount(likeCount - 1); // Decrease like count
          console.log("Post unliked");
        }
      } else {
        // If post is not liked, send like request
        const likeResponse = await axios.put(
          `https://devfortest.my.id/post/like/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (likeResponse.status === 200) {
          setLiked(true);
          setLikeCount(likeCount + 1); // Increase like count
          console.log("Post liked");
        }
      }
    } catch (error) {
      // Handle unauthorized or other errors
      console.error("Error liking/unliking post:", error);
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <img src={image} alt="Post" className="w-96 h-auto max-h-96" />
      <div className="p-2 flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <button
            className="px-2"
            onClick={handleLike}
            style={{ color: liked ? "red" : "white" }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="black"
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
              ></path>
            </svg>
          </button>
          <span className="text-xs">{likeCount}</span>
        </div>
        <div className="flex gap-2">
          <div className="flex-grow">
            <h2 className="font-semibold text-sm">{user.name}</h2>
          </div>
          {onEdit && onDelete && (
            <div className="flex flex-col gap-2">
              <button
                className="outline-1 outline rounded-full px-2 uppercase text-xs font-semibold hover:bg-violet-950 hover:text-gray-50"
                onClick={onDelete}
              >
                delete
              </button>
              <button
                className="outline-1 outline rounded-full px-2 uppercase text-xs font-semibold hover:bg-violet-950 hover:text-gray-50"
                onClick={onEdit}
              >
                edit
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <div className="flex-grow">
            <h2 className="text-sm">{caption}</h2>
          </div>
        </div>
        <p className="text-[#65c3c8] mt-2">{tags}</p>
      </div>
    </div>
  );
};

export default PostCard;
