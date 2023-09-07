import "bootstrap/dist/css/bootstrap.css"; // Import precompiled Bootstrap css
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        className="p-3"
        newestOnTop
      />
      <Layout />
    </>
  );
}

export default App;
