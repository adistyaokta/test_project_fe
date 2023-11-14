// PostForm.js
import React, { useState } from "react";
import InputField from "../auth/InputField";

const PostForm = ({ onClose }) => {
  const [isFormVisible, setFormVisibility] = useState(true);

  const closeForm = () => {
    setFormVisibility(false);
    onClose();
  };

  return (
    <>
      {isFormVisible && (
        <div className="ml-60 my-44 justify-center items-center">
          <div className=" p-5 rounded-lg w-full">
            <h3 className="font-bold text-lg text-center">Create Post</h3>
            <div className="py-4">
              <form>
                <div className="w-full">
                  <label className="label"></label>
                  <div className="flex rounded-full">
                    <input
                      type="text"
                      placeholder="Image"
                      id="image"
                      readOnly
                      name="image"
                      className="input flex-grow input-bordered w-full rounded-s-full pl-3 py-2"
                    />
                    <button
                      type="button"
                      className="bg-[#65c3c8] rounded-l-none rounded-e-full px-5 py-2"
                    >
                      Browse
                    </button>
                  </div>
                  <input type="file" accept="images/*" hidden />
                  <label className="label "></label>
                  <div className="border rounded-md overflow-hidden w-36 h-36 mt-2 border-gray-300 flex justify-center">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className="text-gray-400 text-8xl self-center"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="416"
                        height="352"
                        x="48"
                        y="80"
                        fill="none"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        rx="48"
                        ry="48"
                      ></rect>
                      <circle
                        cx="336"
                        cy="176"
                        r="32"
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="32"
                      ></circle>
                      <path
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="M304 335.79l-90.66-90.49a32 32 0 00-43.87-1.3L48 352m176 80l123.34-123.34a32 32 0 0143.11-2L464 368"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="form-control w-full">
                  <label className="label"></label>
                  <textarea
                    id="caption"
                    name="caption"
                    className="h-24 w-full undefined rounded-3xl px-3 pt-2"
                    placeholder="Caption"
                  ></textarea>
                  <label className="label "></label>
                </div>
                <div className="form-control w-full">
                  <label className="label"></label>
                  <InputField type="text" placeholder="Tags" />
                  <label className="label "></label>
                </div>
                <div className="flex flex-row justify-end gap-3">
                  <button
                    type="button"
                    className="px-5 py-2 rounded-full uppercase font-semibold hover:bg-gray-400"
                    onClick={closeForm}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-[#65c3c8] px-5 py-2 rounded-full uppercase font-semibold hover:bg-[#53a0a4]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostForm;
