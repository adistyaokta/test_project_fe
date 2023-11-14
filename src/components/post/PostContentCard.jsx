import React, { useState } from "react";
import PostEdit from "./PostEdit";
import PostDelete from "./PostDelete";

const PostContentCard = ({ post }) => {
  const { id, caption, image, likes, tags, createdAt, user, liked } = post;

  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const openEditModal = () => {
    setIsEditModal(true);
  }
  
  const closeEditModal = () => {
    setIsEditModal(false);
  }
  const openDeleteModal = () => {
    setIsDeleteModal(true);
  }
  
  const closeDeleteModal = () => {
    setIsDeleteModal(false);
  }

  
  return (
    <>
      <div className="border rounded-md overflow-hidden">
        <img src={image} alt="string" />
        <div className="p-2">
          <div className="flex gap-1 align-middle items-center">
            <button className="btn btn-ghost btn-sm px-2">
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
            <span className="text-xs">{likes}</span>
          </div>
          <div className="flex gap-2">
            <div className="flex-grow">
              <h2 className="font-semibold text-sm">{user.name}</h2>
              <p className="text-sm text-gray-700 w-full line-clamp-2 h-10">
                {caption}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="flex flex-col gap-2">
                <button className="outline-1 outline rounded-full px-2 uppercase text-xs font-semibold hover:bg-violet-950 hover:text-gray-50"
                onClick={openDeleteModal}>
                  delete
                </button>
                <button className="outline-1 outline rounded-full px-2 uppercase text-xs font-semibold hover:bg-violet-950 hover:text-gray-50"
                onClick={openEditModal}>
                  edit
                </button>
              </div>
            </div>
          </div>
          <p className="text-primary">{tags}</p>
        </div>
      </div>

      {isEditModal && <PostEdit postId={id} onClose={closeEditModal} isOpen={isEditModal}/>}
      {isDeleteModal && <PostDelete postId={id} onClose={closeDeleteModal} isOpen={isDeleteModal}/>}
    </>
  );
};

export default PostContentCard;
