import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import User from "./pages/User";
import ChangePassword from "./pages/ChangePassword";
import Post from "./pages/Post";
import TestApi from "./pages/TestApi";
import Login from "./pages/Login";
import TestRegister from "./pages/Register";
import { RequireAuth } from 'react-auth-kit';
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth loginPath="/login">
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/user"
            element={
              <RequireAuth loginPath="/login">
                <User />
              </RequireAuth>
            }
          />
          <Route
            path="/change-password"
            element={
              <RequireAuth loginPath="/login">
                <ChangePassword />
              </RequireAuth>
            }
          />
          <Route
            path="/post"
            element={
              <RequireAuth loginPath="/login">
                <Post />
              </RequireAuth>
            }
          />
          <Route
            path="/modal"
            element={
              <RequireAuth loginPath="/login">
                <TestApi />
              </RequireAuth>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  );
}

export default App;
