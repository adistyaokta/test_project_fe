import React, { useState } from "react";
import axios from "axios";
import InputField from "../auth/InputField";

const ChangePasswordForm = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('update clicked')
    
    console.log(passwordData);

    try {
      if (passwordData.newPassword !== passwordData.confirmNewPassword) {
        console.error("New passwords do not match");
        return;
      }

      const storedToken = localStorage.getItem("token");

      console.log(`token: ${storedToken}`);
      const response = await axios.put(
        "https://devfortest.my.id/user/change-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="main-content px-4 p4-6 md:px-12 md:py-12 h-full">
      <div className="flex ml-60 lg:ml-0 justify-center h-full overflow-y-auto">
        <form className="w-full max-w-lg" onSubmit={handleFormSubmit}>
        <div className="flex flex-row items-center justify-center lg:justify-start mb-2">
            <p className="text-xl text-center w-full text-black py-2">
              Change Password
            </p>
          </div>
          <div className="form-control w-full">
            <label className="label"></label>
            <InputField
              type="password"
              placeholder="Old Password"
              id="oldPassword"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handleInputChange}
            />
            <label className="label "></label>
          </div>
          <div className="form-control w-full">
            <label className="label"></label>
            <InputField
              type="password"
              placeholder="New Password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleInputChange}
            />
            <label className="label "></label>
          </div>
          <div className="form-control w-full">
            <label className="label"></label>
            <InputField
              type="password"
              placeholder="Confirm Password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handleInputChange}
            />
            <label className="label "></label>
          </div>
          <div className="text-center mt-4 mb-2">
            <button
              className="uppercase font-semibold text-sm bg-[#65c3c8] py-3 px-5 rounded-full w-full mb-2 hover:bg-[#5aafb4]"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
