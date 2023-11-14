import React, { useState, useEffect } from "react";
import axios from "axios";

const PostDelete = ({ onClose, postId }) => {
  const [postData, setPostData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token");

        const response = await axios.get(
          `https://devfortest.my.id/post/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-type": "application/json",
            },
          }
        );
        setPostData(response.data.data);
      } catch (error) {
        console.error("Error fetching post data", error);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      const storedToken = localStorage.getItem("token");

      await axios.delete(`https://devfortest.my.id/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-type": "application/json",
        },
      });

      console.log("Post deleted successfully");
      onClose();
      window.location.reload(); 
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-secondary relative p-4 w-full max-w-md max-h-full rounded-lg">
        <div className="relative bg-gray-100 rounded-lg shadow">
        </div>
        <div className="modal">
          <div className="modal-box">
            <div className="py-4 text-center">
              Are you sure you want to delete this data?
            </div>
            <div className="flex flex-row gap-5 justify-center items-center">
              <button
                type="button"
                className="px-4 py-2 rounded-full uppercase text-sm font-semibold hover:bg-gray-400"
                onClick={onClose}
              >
                No
              </button>
              <button
                type="button"
                className="bg-primary px-4 py-2 rounded-full uppercase text-sm font-semibold hover:bg-opacity-70"
                onClick={handleDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDelete;
