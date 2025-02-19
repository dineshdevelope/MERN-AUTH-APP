import Task from "../models/task.model.js";

export const CreateTask = async (req, res) => {
  const task = new Task({
    user: req.user._id,
    title: req.body.title,
    discription: req.body.discription,
  });

  try {
    const newTask = await task.save();
    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  //return res.json(req.body);
};

export const GetAllTask = async (req, res) => {
  try {
    const task = await Task.find({ user: req.user._id });
    if (task === null) {
      return res.status(404).json({ message: "Can't find Task" });
    } else {
      return res.status(200).json(task);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const UpdateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        discription: req.body.discription,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const DeleteTask = async (req, res) => {
  const userId = req.params.id;
  try {
    //const task = await Task.find({ user: req.user._id });
    await Task.deleteOne({ _id: req.params.id });
    res.json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
