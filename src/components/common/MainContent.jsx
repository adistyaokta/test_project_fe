import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import PostCard from "./PostCard";
import SearchBox from "./SearchBox";

const MainContent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem("token");
      try {
        const response = await axios.get(`https://devfortest.my.id/post`, {
          params: {
            page: 1,
            limit: 8,
          },
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <main className="main flex flex-grow transition-all duration-150 ease-in ">
      <div className="flex md:ml-60 h-screen">
        <button className="btn btn-circle btn-ghost md:hidden">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M80 160h352M80 256h352M80 352h352"
            ></path>
          </svg>
        </button>

        <div className="main-content px-4 p-6 md:px-12 md:py-12 h-full w-full">
          <div className="h-full w-full relative px-4 py-4">
            <SearchBox />

            <div className="flex-grow h-4/5 overflow-y-auto pr-4">
              <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {data.map((post) => (
                  <div key={post.id} className="col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-2">
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Pagination />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
