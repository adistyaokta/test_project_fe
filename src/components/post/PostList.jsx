// PostList.js
import React, { useState } from 'react';
import SearchBox from '../common/SearchBox';
import PostForm from './PostForm';

const PostList = () => {
  const [isFormVisible, setFormVisibility] = useState(false);

  const showForm = () => {
    setFormVisibility(true);
  };

  const hideForm = () => {
    setFormVisibility(false);
  };

  return (
    <div className="flex flex-grow ml-60 px-4 py-6 md:px-12 md:py-12 h-screen">
      <div className="flex h-full w-full relative">
        <button
          className="absolute bottom-0 right-0 bg-[#65c3c8] rounded-full p-4 m-1"
          onClick={showForm}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke-linecap="square"
              stroke-linejoin="round"
              strokeWidth="32"
              d="M256 112v288m144-144H112"
            ></path>
          </svg>
        </button>
        <div className="flex flex-col justify-between h-full w-full overflow-hidden">
          <SearchBox />
          <div className="flex gap-4 justify-center align-middle items-center h-full">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="32"
                    d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z"
                  ></path>
                  <path
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="32"
                    d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z"
                  ></path>
                  <path d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z"></path>
            </svg>
            <span className="text-2xl text-red-500">No Data Available</span>
          </div>
        </div>
      </div>
      {isFormVisible && <PostForm onClose={hideForm} />}
    </div>
  );
};

export default PostList;
