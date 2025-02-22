import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  const apiUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/profile`, {
          withCredentials: true,
        });
        setUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/api/profile`, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/api/logout`, {
        withCredentials: true,
      });
      console.log("Logout Sucess");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="max-w-md mx-auto mt-10 px-3">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Account Settings
        </h2>
        {user ? (
          <div className="space-y-4">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <div className="flex justify-between items-center mt-5">
              <div>
                <Link to={"/updatepage"} className="btn">
                  Update
                </Link>
              </div>
              <div>
                <button className="btn" onClick={handleDelete}>
                  Delete
                </button>
              </div>
              <div>
                <button className="btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <Link to={"/readtask"} className="btn">
                Back
              </Link>
            </div>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
