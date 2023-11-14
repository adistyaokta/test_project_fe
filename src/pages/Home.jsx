import React from "react";
import Sidebar from "../components/common/Sidebar";
import MainContent from "../components/common/MainContent";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Home;

