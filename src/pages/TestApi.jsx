import React, { useState } from "react";
import axios from "axios";

function TestApi() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

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

      setUploadStatus(response.data.data.link);
      setUploadError(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus(null);
      setUploadError("Error uploading file. Please try again.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploadStatus && <p>File successfully uploaded. Link: {uploadStatus}</p>}
      {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
    </div>
  );
}

export default TestApi;
