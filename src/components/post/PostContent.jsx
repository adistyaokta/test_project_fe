import React, { useState, useEffect } from "react";
import SearchBox from "../common/SearchBox";
import { jwtDecode } from "jwt-decode";
import CreatePostModal from "./CreatePostModal";
import axios from "axios";
import PostContentCard from "./PostContentCard";

const PostContent = () => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token");

        const decodedToken = jwtDecode(storedToken);

        if (!decodedToken || !decodedToken.sub) {
          throw new Error("Unable to decode token");
        }

        setUserId(decodedToken.sub);

        const response = await axios.get(
          `https://devfortest.my.id/post/user/${decodedToken.sub}?page=1&limit=8`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.status === 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="flex-grow h-screen overflow-y-auto py-12 px-16 ml-72">
      <SearchBox />
      <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-4 lg:grid-cols-8 xl:gap-x-8">
        {data.map((post) => {
          const postId = post.id || null;

          return (
            <div
              key={postId}
              className="col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-2"
            >
              <PostContentCard post={post} />
            </div>
          );
        })}
      </div>
      <CreatePostModal />
    </div>
  );
};

export default PostContent;
