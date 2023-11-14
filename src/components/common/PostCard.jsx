import React from "react";
import axios from "axios";

const PostCard = ({ post }) => {
  const { id, caption, image, likes, tags, createdAt, user, liked } = post;

  const handleLike = async () => {
    const storedToken = localStorage.getItem('token');
  
    try {
      const response = await axios.put(
        `https://devfortest.my.id/post/like/${id}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        // Assuming you have a state variable to manage likes, update it accordingly
        // For example, if 'liked' is a state variable:
        // setLiked(!liked);
  
        console.log("Post liked");
      }
    } catch (error) {
      // Handle unauthorized or other errors
      console.error('Error liking post:', error);
    }
  };
  

  return (
    <div className="border rounded-md overflow-hidden">
      <img
        src={image}
        alt="Post"
        className="w-96 h-auto max-h-96"
      />
      <div className="p-2">
        <div className="flex gap-1 align-middle items-center">
          <button className="px-2" onClick={handleLike}>
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
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
              ></path>
            </svg>
          </button>
          <span className="text-xs">{likes || 0}</span>
        </div>
        <div className="flex gap-2">
          <div className="flex-grow">
            <h2 className="font-semibold text-sm">{user.name}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-grow">
            <h2 className=" text-sm">{caption}</h2>
          </div>
        </div>
        <p className="text-[#65c3c8] mt-5">{tags}</p>
      </div>
    </div>
  );
};

export default PostCard;
