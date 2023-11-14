// PostContentCard.js
import React, { useState } from "react";
import PostEdit from "./PostEdit";
import PostDelete from "./PostDelete";
import PostCard from "../common/PostCard";

const PostContentCard = ({ post }) => {
  const { id } = post;

  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const openEditModal = () => {
    setIsEditModal(true);
  };

  const closeEditModal = () => {
    setIsEditModal(false);
  };
  const openDeleteModal = () => {
    setIsDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModal(false);
  };

  return (
    <>
      <PostCard post={post} onEdit={openEditModal} onDelete={openDeleteModal} />

      {isEditModal && (
        <PostEdit postId={id} onClose={closeEditModal} isOpen={isEditModal} />
      )}
      {isDeleteModal && (
        <PostDelete
          postId={id}
          onClose={closeDeleteModal}
          isOpen={isDeleteModal}
        />
      )}
    </>
  );
};

export default PostContentCard;
