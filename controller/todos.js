const todoModel = require("../model/todosModel");

//create Todo

exports.makeTodo = async (req, res) => {
  const userName = req.headers.username;
  const { todoName, todoDes } = req.body;
  const todoStatus = "new";
  const createdate = Date.now();
  const updateDate = Date.now();
  try {
    const todo = await todoModel.create({
      username: userName,
      todoName: todoName,
      todoDes: todoDes,
      todoStatus: todoStatus,
      createDate: createdate,
      updateDate: updateDate,
    });

    return res
      .status(201)
      .json({ status: "Todo created succesfully", data: todo });
  } catch (error) {
    res.end(error.message);
  }
};

//select Todo

exports.selectTodo = async (req, res) => {
  const userName = req.headers.username;

  try {
    const todos = await todoModel.find({ username: userName });

    return res
      .status(201)
      .json({ status: "Todo select succesfully", data: todos });
  } catch (error) {
    res.end(error.message);
  }
};

//update todo

exports.updateTodo = async (req, res) => {
  const { todoName, todoDes, id } = req.body;
  const userName = req.headers.username;

  try {
    const todo = await todoModel.updateMany(
      { _id: id, username: userName },
      {
        todoName: todoName,
        todoDes: todoDes,
      }
    );

    const updatedTodo = await todoModel.findOne({
      _id: id,
      username: userName,
    });

    return res.status(201).json({ status: todo, data: updatedTodo });
  } catch (error) {
    res.end(error.message);
  }
};

//update todo Status

exports.updateStatus = async (req, res) => {
  const { id, todoStatus } = req.body;
  const userName = req.headers.username;
  const updateDate = Date.now();

  try {
    const todo = await todoModel.updateMany(
      { _id: id, username: userName },
      {
        todoStatus: todoStatus,
        updateDate: updateDate,
      }
    );

    const updatedTodo = await todoModel.findOne({
      _id: id,
      username: userName,
    });

    return res.status(201).json({ status: todo, data: updatedTodo });
  } catch (error) {
    res.end(error.message);
  }
};

//remove todo

exports.removeTodo = async (req, res) => {
  const { id } = req.body;
  const userName = req.headers.username;

  try {
    const remove = await todoModel.remove({ _id: id, username: userName });
    return res
      .status(201)
      .json({ status: "deleted successfully", data: remove });
  } catch (error) {
    res.end(error.message);
  }
};

//Find by date

exports.findbyDate = async (req, res) => {
  const { fromDate, toDate } = req.body;
  const userName = req.headers.username;

  try {
    const findTodo = await todoModel.find({
      username: userName,
      createDate: { $gte: new Date(fromDate), $lte: new Date(toDate) },
    });

    return res
      .status(201)
      .json({ status: "find successfully", data: findTodo });
  } catch (error) {
    res.end(error.message);
  }
};

exports.findbyStatus = async (req, res) => {
  const userName = req.headers.username;
  const { todoStatus } = req.body;

  try {
    const findTodo = await todoModel.find({
      username: userName,
      todoStatus: todoStatus,
    });

    return res
      .status(201)
      .json({ status: "find successfully", data: findTodo });
  } catch (error) {
    res.end(error.message);
  }
};
