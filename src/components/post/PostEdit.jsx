import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import InputField from "../auth/InputField";

const PostEdit = ({ onClose, postId }) => {
  const [postData, setpostData] = useState({});
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  const handleUpload = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);

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

      setUploadImage(response.data.data.link)
      return response.data.data.link
    } catch (error) {
      console.error("Error uploading file:", error);
      return null
    }
  };

  useEffect(() => {
    console.log("post id: ", postId);
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
        setpostData(response.data.data);
        setCaption(response.data.data.caption || "");
        setTags(response.data.data.tags || "");
      } catch (error) {
        console.error("Error fetching post data", error);
      }
    };
    fetchData();
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "caption") {
      setCaption(value);
    } else if (name === "tags") {
      setTags(value);
    }  
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const uploadedImage = await handleUpload();

    await handleUpload();

    console.log(`caption: ${caption} tags: ${tags} image: ${uploadedImage}`);

    try {
      const storedToken = localStorage.getItem("token");

      await axios.put(
        `https://devfortest.my.id/post/${postId}`,
        {
          caption,
          tags,
          image: uploadedImage || postData.image,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating post", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-secondary relative p-4 w-full max-w-md max-h-full rounded-lg">
        <div className="relative bg-gray-100 rounded-lg shadow">
          <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-bold text-gray-800">Edit Post</h3>
          </div>
        </div>
        <form className="px-5 py-3 flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="w-full">
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
                value={uploadImage ||  postData.image}
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
            <label className="label "></label>
            <div className="border rounded-md overflow-hidden w-36 h-36 mt-2 border-gray-300 flex justify-center">
              <img
                src={file ? URL.createObjectURL(file) : postData.image}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label"></label>
            <textarea
              id="caption"
              name="caption"
              className="bg-secondary border border-gray-300 h-24 w-full undefined rounded-3xl px-3 pt-2"
              placeholder="Caption"
              value={caption || ""}
              onChange={handleInputChange}
            ></textarea>
            <label className="label "></label>
          </div>
          <div className="form-control w-full">
            <label className="label"></label>
            <InputField
              type="text"
              placeholder="Tags"
              name="tags"
              value={tags || ""}
              onChange={handleInputChange}
            />
            <label className="label "></label>
          </div>
          <div className="flex flex-row justify-end gap-3">
            <button
              type="button"
              className="px-5 py-2 rounded-full uppercase font-semibold hover:bg-gray-400"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-primary px-5 py-2 rounded-full uppercase font-semibold hover:bg-[#53a0a4]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEdit;
