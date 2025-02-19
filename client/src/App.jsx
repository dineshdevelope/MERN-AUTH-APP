import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import UpdatePage from "./pages/UpdatePage";
import ProfilePage from "./pages/ProfilePage";
import ReadTask from "./pages/ReadTask";

function App() {
  return (
    <>
      <Header />
      <ToastContainer limit={1} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/updatepage" element={<UpdatePage />} />
        <Route path="/readtask" element={<ReadTask />} />
      </Routes>
    </>
  );
}

export default App;
