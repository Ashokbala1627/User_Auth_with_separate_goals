const { text } = require("express");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

//getGoal
const getGoal = async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
};

//setGoal
const setGoal = async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({ text: req.body.text, user: req.user.id });

  res.status(200).json(goal);
};

//updateGoal
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: "Goal does not exist" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    if (goal.user.toString() !== user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    /* const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    ); */

    if (!updatedGoal) {
      return res.status(400).json({ message: "Failed to update goal" });
    }

    res.status(200).json(updatedGoal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//deleteGoal
const deleteGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal does not exist");
  }
  Goal.findByIdAndDelete(req.params.id).then(() =>
    res.status(200).json("Goal Deleted")
  );
};

module.exports = { getGoal, setGoal, updateGoal, deleteGoal };
