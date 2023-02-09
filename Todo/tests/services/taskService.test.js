// const {HTTPError}=require('../errors/HTTPError');
const {task}=require('../../src/models');
const taskService=require('../../src/services/taskService');

describe('Task Service Get All Tasks',()=>{
  it('should return an array of tasks',async()=>{
    const tasks=[{
      'id': 15,
      'title': 'task1',
      'isComplete': false,
    },{
      'id': 16,
      'title': 'task2',
      'isComplete': false,
    }];
    jest.spyOn(task,'findAll').mockResolvedValue(tasks);
    const result = await taskService.getAllTasks();
    expect(result).toEqual(tasks);
  });

});
describe('Task Service get task by id',()=>
{
  it('should return an task with given id ',async() =>{

    const task={
      'id': 16,
      'title': 'task2',
      'isComplete': false,
    };
    jest.spyOn(task,'getTask').mockResolvedValue(task);
    const result=await

  });
});