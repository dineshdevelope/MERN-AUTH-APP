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
        const res = await axios.get(`${apiUrl}/profile`, {
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
      await axios.delete(`${apiUrl}/profile`, {
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
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {user ? (
          <div>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <div className="flex justify-between items-center">
              <div>
                <Link
                  to={"/updatepage"}
                  className="bg-green-500 p-1 rounded text-white"
                >
                  Update
                </Link>
              </div>
              <div>
                <button
                  className="bg-red-500 p-1 rounded text-white"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
              <div>
                <button
                  className="bg-pink-500 p-1 rounded text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
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
