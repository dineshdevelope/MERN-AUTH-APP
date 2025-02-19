import React, { useEffect, useState } from "react";
import axios from "axios";

const ReadTask = () => {
  const [data, setData] = useState([]);
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/task/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`${apiUrl}/task`, {
          withCredentials: true,
        });
        setData(res.data);
        //console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [handleDelete]);
  return (
    <div className="px-3">
      <div className="flex justify-between items-center mt-5">
        <button className="button">
          <span className="text-xs flex">Welcome Dinesh Kumar</span>
        </button>

        <div className="flex items-center space-x-4">
          <button className="text-xs bg-gray-700 p-2 rounded text-white cursor-pointer hover:bg-gray-800">
            Add Task
          </button>
          <button className="text-xs bg-rose-500  p-2 rounded text-gray-100 cursor-pointer hover:bg-rose-600">
            Logout
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5  sm:mt-10 relative">
        {data.map((item, index) => {
          return (
            <div
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-5 sm:mb-10"
              key={index}
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.discription}
              </p>

              <div className="flex justify-between items-center">
                <button className="btn">UPDATE</button>
                <button className="btn" onClick={() => handleDelete(item._id)}>
                  DELETE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadTask;
