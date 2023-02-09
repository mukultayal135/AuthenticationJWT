const taskService = require('../services/taskService');
const HTTPError = require('../errors/HTTPError');
const Joi = require('joi');

exports.getAllTasks = async (req, res) => {
  
  const todos = await taskService.getAllTasks();
  res.status(200);
  res.json(todos);
};
exports.getTask = async (req, res) => {
  const schema= Joi.number().integer();
  try {
    console.log(typeof req.params.id);
    const {error}=schema.validate(req.params.id);
    
    if(error)
    {
      res.status(400).json({'messaage':error.message});
    }
    else{
      const task = await taskService.getTask(req.params.id);
      console.log('Executed');
      res.status(200);
      res.json(task);
    }
  } catch (error) {
    if(error instanceof HTTPError)
    {
      res.status(error.code);
      res.json({ message: error.message });
    }
    else{
      res.status(500);
      res.json({ message: error.message });
    }
  }
};

exports.deleteTask = async (req, res) => {
  try{
    const message=await taskService.deleteTask();
    res.status(200);
    res.json(message);

  }
  catch(error)
  {
    
  }
  
};

exports.createTask = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string()
      .alphanum()
      .required()
  });
  const { body } = req;
  const { error} = schema.validate(body);
  if(!error)
  {
    const task = await taskService.createTask(body);
    res.status(201);
    res.send(task);
  }
  else{
    res.status(400);
    res.json(error.message);
  }
};
exports.updateTask = async (req, res) => {

  const { id } = req.params;
  try {
    const updatedTask = await taskService.updateTask(id,req.body);
    res.status(200);
    res.json(updatedTask);
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};
