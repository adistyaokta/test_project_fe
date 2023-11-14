import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { toast } from 'react-toastify'; 
import InputField from "./InputField";
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://devfortest.my.id/auth/login", {
        username,
        password,
      });

      if (response.status === 201) {
        const { token } = response.data.data;
        localStorage.setItem("token", token);
        signIn({
          token: token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { username: username}
        });
        navigate("/");
        toast.success('Successfully logged in');
      } else {
        toast.error(`Login Failed. Please check your credentials. ${response.data.message}`);
        console.error("Login Failed:", response.data);
      }
    } catch (error) {
      toast.error("Error logging in. Please try again later.");
      console.log("Error login", AxiosError);
    }
  };

  return (
    <section className="bg-secondary h-screen w-full flex items-center justify-center px-5">
      <div className="border border-primary w-full  rounded-lg shadow sm:max-w-lg">
        <div className="p-6 space-y-4 md:space-y-6">
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <p className="text-xl text-center text-black py-2">Login</p>

            <div>
              <InputField
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                required
                value={username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <InputField
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                required
                value={password}
                onChange={handleInputChange}
              />
            </div>

            <div className="text-center flex flex-col gap-2">
              <button
                type="submit"
                className="bg-primary text-sm text-gray-900 rounded-full uppercase font-semibold py-3 hover:bg-[#61b9bd]"
              >
                Login
              </button>
              <a
                href="/register"
                className="text-[#65c3c8] text-sm hover:underline-offset-1 hover:underline"
              >
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
