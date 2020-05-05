const express = require('express');
const router = express.Router();
const User = require("../models/user-model");
const Task = require("../models/task-model");

// GET 1 TASK
router.get(':id', (req, res, next) => {
  const { id } = req.params;
  Task
    .findById(id)
    .then((oneTask) => {
      res
        .status(200)
        .json(oneTask);
    })
    .catch((err) => {
      res
        .status(400)
        .json(err)
    });
});


// CREATE TASK
router.post('/', (req, res, next) => {
  const {name, description, createdDate } =req.body;
  const id = req.session.currentUser._id;
  Task
    .create({ name, description, createdDate })
    .then(newTask => {
      res
      .status(201)
      .json(newTask);
      User.findByIdAndUpdate(
        id, 
        { $push: {tasks: newTask._id} },
        { new: true }
      )
      .then(response => {
        console.log('response', response);
      })
      .catch(err => {
        console.log('error', error)
      })
    })
    .catch(err => { 
      res
        .status(500)
        .json(err);
    });
});


// UPDATE Task
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  Task
    .findByIdAndUpdate(id, { name, description })
    .then(updatedTask => {
      res
      .status(200)
      .json(updatedTask);
    })
    .catch(err => {
      res
        .status(500)
        .json(err)
    });
});


// DELETE Task
router.delete('/:id', (req,res, next) => {
  const { id } = req.params;
  Task
    .findByIdAndRemove(id)
    .then((data) => {
      res
        .status(202)
        .json(data)
    })
    .catch(err => {
      res
        .status(500)
        .json(err)
    });
});

module.exports = router;