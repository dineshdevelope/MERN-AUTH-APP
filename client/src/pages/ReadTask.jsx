import React, { useEffect, useState } from "react";
import axios from "axios";
import EmptyTask from "../components/EmptyTask";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const ReadTask = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${apiUrl}/profile`, {
        withCredentials: true,
      });
      setUsername(res.data.username);
      console.log(res.data.username);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/task/${id}`, {
        withCredentials: true,
      });
      setData(data.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${apiUrl}/task`,
        { title, discription },
        {
          withCredentials: true,
        }
      );
      setIsModalOpen(false);
      fetchTask();
    } catch (error) {
      console.error(error);
      setIsModalOpen(false);
    }
  };
  const openUpdateModel = (task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setDiscription(task.discription);
    setIsModalUpdateOpen(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${apiUrl}/task/${selectedTask._id}`,
        { title, discription },
        {
          withCredentials: true,
        }
      );
      setIsModalUpdateOpen(false);
      setSelectedTask(null);
      fetchTask();
    } catch (error) {
      console.error(error);
      setIsModalUpdateOpen(false);
    }
  };

  useEffect(() => {
    fetchTask();
    fetchUser();
  }, []);
  return (
    <div className="px-3 ">
      <div className="flex justify-between items-center mt-5 space-x-1">
        <button className="button">
          <span className="text-xs flex">
            WELCOME {username.toUpperCase() || "USER"}
          </span>
        </button>

        <div className="flex items-center space-x-4">
          <button
            className="  text-xs bg-gray-700 p-2 rounded text-white cursor-pointer hover:bg-gray-800"
            onClick={() => setIsModalOpen(true)}
          >
            Add Task
          </button>
          {/*  Old  Button */}
          {/* <button className="text-xs bg-rose-500  p-2 rounded text-gray-100 cursor-pointer hover:bg-rose-600">
            Logout
          </button> */}

          {/*  New  Button */}
          <div className="max-w-sm ">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                  Settings
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 size-5 text-gray-400"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <Link
                      to={"/profile"}
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden "
                    >
                      Account settings
                    </Link>
                  </MenuItem>

                  {/*  <form action="#" method="POST"> */}
                  <MenuItem>
                    <button
                      type="submit"
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                  {/*   </form> */}
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 px-5">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-semibold">Add Task</h3>
              <button
                className="bg-red-600 p-1.5  text-white font-semibold text-lg rounded cursor-pointer"
                onClick={() => setIsModalOpen(false)} // Close modal
              >
                ×
              </button>
            </div>

            <form className="space-y-4 mt-4" onSubmit={addTask}>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Task Title
                </label>
                <input
                  type="text"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border rounded-lg"
                  name="discription"
                  onChange={(e) => setDiscription(e.target.value)}
                  required
                  placeholder="Enter task description"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full  text-white p-2 rounded-lg  btn"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
      {data.length >= 1 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5  sm:mt-10 relative">
            {data.map((item) => {
              return (
                <div
                  className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-5 sm:mb-10"
                  key={item._id}
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.title}
                  </h5>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {item.discription}
                  </p>

                  <div className="flex justify-between items-center">
                    <button
                      className="btn"
                      onClick={() => openUpdateModel(item)}
                    >
                      UPDATE
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {isModalUpdateOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 px-5">
              <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="text-xl font-semibold">Edit your Task</h3>
                  <button
                    className="bg-red-600 p-1.5  text-white font-semibold text-lg rounded cursor-pointer"
                    onClick={() => setIsModalUpdateOpen(false)} // Close modal
                  >
                    ×
                  </button>
                </div>

                <form className="space-y-4 mt-4" onSubmit={updateTask}>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Task Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full p-2 border rounded-lg"
                      placeholder="Enter task title"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-lg"
                      name="discription"
                      onChange={(e) => setDiscription(e.target.value)}
                      required
                      value={discription}
                      placeholder="Enter task description"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full  text-white p-2 rounded-lg  btn"
                  >
                    Update Task
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {" "}
          <EmptyTask />{" "}
        </div>
      )}
    </div>
  );
};

export default ReadTask;
