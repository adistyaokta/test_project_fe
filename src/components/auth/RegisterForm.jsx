import React, { useState, useRef } from 'react';
import axios from 'axios';
import InputField from './InputField';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (event) => {
    const newFile = event.target.files[0];
  
    try {
      const formData = new FormData();
      formData.append('file', newFile);
  
      const response = await axios.post('https://devfortest.my.id/post/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('File upload response:', response);
  
      setImageUrl(response.data.data.link);
      setUploadStatus(response.data.data.link);
      setUploadError(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus(null);
      setUploadError('Error uploading file. Please try again.');
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your existing submit logic here

    // Example: Send formData, imageUrl, etc., to the registration endpoint
    console.log('Form data:', formData);
    console.log('Image URL:', imageUrl);
  };

  return (
    <section className="bg-[#faf7f5] h-full flex items-center justify-center px-5 py-4">
      <div className="border border-primary w-full rounded-lg shadow sm:max-w-lg">
        <div className="p-6 space-y-4 md:space-y-6">
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <p className="text-xl text-center text-black py-2">Register</p>
            <div>
              <InputField
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <InputField
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <InputField
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <InputField
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <InputField
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="flex rounded-full">
                <input
                  type="text"
                  placeholder="Image URL"
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
            <div className="text-center flex flex-col gap-2">
              <button
                type="submit"
                className="bg-[#65c3c8] text-sm text-gray-900 rounded-full uppercase font-semibold py-3 hover:bg-[#61b9bd]"
              >
                Register
              </button>
              <a
                href="/login"
                className="text-[#65c3c8] text-sm hover:underline-offset-1 hover:underline"
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
