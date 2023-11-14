import React, { useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import InputField from "../auth/InputField";

const CreatePostModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFileChange = async (event) => {
    const newFile = event.target.files[0];

    try {
      const storedToken = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", newFile);

      const response = await axios.post(
        "https://devfortest.my.id/post/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageUrl(response.data.data.link);
      setUploadStatus(response.data.data.link);
      setUploadError(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus(null);
      setUploadError("Error uploading file. Please try again.");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const storedToken = localStorage.getItem("token");
      
      // Post creation logic
      const postData = {
        caption,
        tags,
        image: imageUrl,
      };

      await axios.post("https://devfortest.my.id/post", postData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Post created successfully");
      toggleModal();
      window.location.reload();
    } catch (error) {
      console.error("Error creating post", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className="fixed bottom-4 right-4 text-white bg-primary py-3 px-4 m-8 rounded-full hover:opacity-90"
        type="button"
        onClick={toggleModal}
      >
        <FontAwesomeIcon icon={faPlus} className="text-gray-900" />
      </button>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          isModalOpen ? "fixed" : "hidden"
        } flex items-center justify-center overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="absolute w-full h-full bg-opacity-50 backdrop-filter backdrop-contrast-75"></div>
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-gray-100 rounded-lg shadow">
            <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t">
              <h3 className="text-lg font-bold text-gray-800">Create Post</h3>
            </div>
            <form
              className="px-5 py-3 flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="w-full">
                <label className="label"></label>
                <div>
                  <div>
                    <label className="label"></label>
                    <div className="flex rounded-full">
                      <input
                        type="text"
                        accept="image/*"
                        placeholder="Image"
                        id="image"
                        readOnly
                        name="image"
                        className="bg-secondary border border-gray-600 input flex-grow input-bordered w-full rounded-s-full pl-3 py-2"
                        value={imageUrl}
                      />
                      <input
                        type="file"
                        accept="images/*"
                        hidden
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                      <button
                        type="button"
                        className="bg-gray-100 border border-primary rounded-l-none rounded-e-full px-5 py-2 hover:bg-primary"
                        onClick={() => fileInputRef.current.click()}
                      >
                        Browse
                      </button>
                    </div>
                    <input type="file" accept="images/*" hidden />
                    <label className="label"></label>
                  </div>
                </div>
                <label className="label "></label>
                <div className="border rounded-md overflow-hidden w-36 h-36 mt-2 border-gray-300 flex justify-center">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="form-control w-full">
                <label className="label"></label>
                <textarea
                  id="caption"
                  name="caption"
                  className="bg-secondary border border-gray-300 h-24 w-full undefined rounded-3xl px-3 pt-2"
                  placeholder="Caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                ></textarea>
                <label className="label "></label>
              </div>
              <div className="form-control w-full">
                <label className="label"></label>
                <InputField
                  type="text"
                  placeholder="Tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <label className="label "></label>
              </div>
              <div className="flex flex-row justify-end gap-3">
                <button
                  type="button"
                  className="px-5 py-2 rounded-full uppercase font-semibold hover:bg-gray-400"
                  onClick={toggleModal}
                  disabled={isLoading}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="bg-primary px-5 py-2 rounded-full uppercase font-semibold hover:bg-[#53a0a4]"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
