const taskService = require('../../src/services/taskService');
const taskController = require('../../src/controllers/taskController');
const HTTPError = require('../../src/errors/HTTPError');

describe('Task Controller Get All Tasks', () => {
  it('should return an array of tasks.', async () => {
    jest.spyOn(taskService, 'getAllTasks').mockResolvedValue([{
      'id': 15,
      'title': 'task1',
      'isComplete': false,
      'updatedAt': '2023-02-01T07:39:46.121Z',
      'createdAt': '2023-02-01T07:39:46.121Z'
    }]);
    const mockReq = {};
    const mockRes = {
      json: jest.fn(),
      status:jest.fn()
    };
    await taskController.getAllTasks(mockReq, mockRes);
    expect(mockRes.json).toBeCalledWith([{
      'id': 15,
      'title': 'task1',
      'isComplete': false,
      'updatedAt': '2023-02-01T07:39:46.121Z',
      'createdAt': '2023-02-01T07:39:46.121Z'
    }]);
    expect(mockRes.status).toBeCalledWith(200);
  });
});
describe('Task Controller Get Task by Id',()=>
{
  it('should return a task with the given id',async()=>{
    jest.spyOn(taskService,'getTask').mockResolvedValue({
      'id': 15,
      'title': 'task1',
      'isComplete': false,
      'updatedAt': '2023-02-01T07:39:46.121Z',
      'createdAt': '2023-02-01T07:39:46.121Z'
    });
    const mockReq = {
      params:{
        id:15
      }
    };
    const mockRes = {
      status:jest.fn(),
      json:jest.fn()
    };

    await taskController.getTask(mockReq, mockRes);
    expect(mockRes.json).toBeCalledWith({
      'id': 15,
      'title': 'task1',
      'isComplete': false,
      'updatedAt': '2023-02-01T07:39:46.121Z',
      'createdAt': '2023-02-01T07:39:46.121Z'
    });
    expect(mockRes.status).toBeCalledWith(200);
  });  

  it('should send error when task not found',async()=>{
    jest.spyOn(taskService,'getTask').mockRejectedValue(new HTTPError('Task not found'));
    const mockReq = {
      params:{
        id:17
      }
    };
    const mockRes = {
      status:jest.fn(),
      json:jest.fn()
    };

    await taskController.getTask(mockReq, mockRes);
    expect(mockRes.json).toBeCalledWith('Task not found');
    expect(mockRes.status).toBeCalledWith(404);
  });
});
describe('Task Controller Delete Task',()=>{
  it('should delete tasks that are completed',async()=>{
    jest.spyOn(taskService,'deleteTask').mockResolvedValue({'message':'Task deleted successfully'});
    const mockReq = {};
    const mockRes = {
      status:jest.fn(),
      json:jest.fn()
    };
    await taskController.deleteTask(mockReq, mockRes);
    expect(mockRes.json).toBeCalledWith({ message: 'Task deleted successfully' });
    expect(mockRes.status).toBeCalledWith(200);
  });
});

describe('Task Controller Create Task',()=>{
  it('should return a task if body is valid',async()=>
  {
    const value=jest.spyOn(taskService,'createTask').mockResolvedValue({
      'id': 17,
      'title': 'task18',
      'isComplete': false,
      'updatedAt': '2023-02-01T17:51:17.514Z',
      'createdAt': '2023-02-01T17:51:17.514Z'
    });
    const mockReq={
      body:{
        'title':'task18'
      }
    };
    const mockRes = {
      status:jest.fn(),
      json:jest.fn()
    };
    await taskController.createTask(mockReq, mockRes);
    expect(mockRes.json).toBeCalledWith(value);
    expect(mockRes.status).toBeCalledWith(201);
  });
});
describe('Task Controller Update Task',()=>{
  it('should return the  updated task',async()=>{
    
    const mockresult=jest.spyOn(taskService,'updateTask').mockResolvedValue({
      'id': 15,
      'title': 'task1',
      'isComplete': true,
      'createdAt': '2023-02-01T07:39:46.121Z',
    });
    const mockReq = {
      body:{
        'isComplete':true
      },
      params:{
        id:15
      }
    };
    const mockRes = {
      status:jest.fn(),
      json:jest.fn()
    };
    await taskController.updateTask(mockReq, mockRes);
    expect(mockRes.json).toBeCalledWith(mockresult);
    expect(mockRes.status).toBeCalledWith(200);
  });
});
