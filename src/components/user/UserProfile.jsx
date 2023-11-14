import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import InputField from "../auth/InputField";

const UserProfile = () => {
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [token, setToken] = useState("");
  const fileInputRef = useRef(null);
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);

        const response = await fetch("https://devfortest.my.id/user", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result.data);
        setEditedData(result.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    setDisabled((prevDisabled) => !prevDisabled);
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
  
      console.log("File Upload Response:", response.data);
      const newPhotoUrl = response.data.data.link;

      setEditedData((prevData) => ({ ...prevData, photo: newPhotoUrl }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storedToken = localStorage.getItem("token");

      const response = await axios.put(
        "https://devfortest.my.id/user",
        editedData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("PUT Request Response:", response.data);
      setData(response.data);
      setDisabled(true);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <section className="bg-white h-screen flex flex-grow items-center justify-center px-5 py-4">
      <div className="w-full rounded-lg md:max-w-lg md:w-full">
        <div className="p-6 space-y-4 md:space-y-6">
          <form className="sm:ml-32 w-full max-w-lg lg:ml-0" onSubmit={handleSubmit}>
            <div className="w-full">
              <label className="label"></label>
              <InputField
                type="text"
                placeholder={data.name}
                id="name"
                name="name"
                value={editedData.name || ""}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <label className="label "></label>
            </div>
            <div className="w-full">
              <label className="label"></label>
              <InputField
                type="text"
                placeholder={data.username}
                id="username"
                name="username"
                value={editedData.username || ""}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <label className="label "></label>
            </div>
            <div className="w-full">
              <label className="label"></label>
              <InputField
                type="email"
                placeholder={data.email}
                id="email"
                name="email"
                value={editedData.email || ""}
                onChange={handleInputChange}
                disabled={isDisabled}
              />
              <label className="label "></label>
            </div>
            <div>
              <div className="flex rounded-full">
                <input
                  type="text"
                  accept="image/*"
                  placeholder="Image"
                  id="image"
                  readOnly
                  name="image"
                  className="bg-secondary border border-gray-600 text-slate-400 flex-grow input-bordered w-full rounded-s-full pl-3 py-2"
                  value={editedData.photo || ""}
                  disabled={isDisabled}
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  className={`bg-gray-100 border border-primary rounded-l-none rounded-r-full px-5 py-2 hover:bg-primary ${
                    isDisabled ? "text-primary bg-gray-200 hover:bg-gray-200 " : ""
                  }`}
                  onClick={() => {
                    fileInputRef.current.click();
                    setDisabled(true); 
                  }}
                  disabled={isDisabled}
                >
                  Browse
                </button>
              </div>

              <div className="border rounded-md overflow-hidden w-36 h-36 mt-2 border-gray-300 flex justify-center">
                <img src={editedData.photo} alt="display-tmp" />
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-8 mb-2 w-full">
              <button
                className="uppercase font-semibold text-sm outline outline-1 px-5 py-2 mb-2 rounded-full hover:bg-indigo-950 hover:text-gray-50"
                type="button"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className={`bg-primary uppercase font-semibold text-sm px-5 py-2 mb-2 rounded-full hover:bg-indigo-950 hover:text-gray-50 ${
                  isDisabled ? "text-primary bg-white hover:bg-white hover:text-primary" : ""
                }`}
                type="submit"
                disabled={isDisabled}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
