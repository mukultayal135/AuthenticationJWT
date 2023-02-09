
const HTTPError = require('../errors/HTTPError');
const {task}= require('../models');
exports.getAllTasks = async () => await task.findAll();
exports.getTask = async (id) => {
  const Task = await task.findOne(
    {
      where: { id:Number(id)}
    });
  if (!Task) {
    throw new HTTPError('Task not found', 404);
  }
  return Task;
};

exports.deleteTask = async() => {
  const deletedCount=task.destroy({
    where:{
      isComplete:true
    }
  });
  return deletedCount;
};
exports.createTask = async (body) => {
  const Task = {
    title: body.title,
    isComplete: false,
  };
  const createdTask=await task.create(Task);
  return createdTask;
};
exports.updateTask = async (id,data) => {
  const Task = await task.update(data,{
    where:{
      id:id
    } ,returning: true,
  });
  if (!Task) {
    throw new Error('Task not found');
  }
  return Task[1][0];
    
};
