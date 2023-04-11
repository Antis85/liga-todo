import { BasicAgent } from './Basic.agent';
import { TaskEntity } from 'domains/index';
import {
  GetAllTasksQuery,
  GetAllTasksResponse,
  GetTaskResponse,
  UpdateTaskQuery,
  UpdateTaskResponse,
  CreateTaskQuery,
  CreateTaskResponse,
} from 'http/model';

class TasksAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async getAllTasks(params?: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const { data } = await this._http.get<GetAllTasksResponse>(`/tasks`, {
      params,
    });

    return data;
  }

  async getTask(taskId: TaskEntity['id']): Promise<GetTaskResponse> {
    const { data } = await this._http.get<GetTaskResponse>(`/tasks/${taskId}`);

    return data;
  }

  async createTask(newTask: CreateTaskQuery): Promise<CreateTaskResponse> {
    const { data } = await this._http.post<CreateTaskResponse>('/tasks', newTask);

    return data;
  }

  async updateTask(taskId: TaskEntity['id'], updatedTask: UpdateTaskQuery): Promise<UpdateTaskResponse> {
    const { data } = await this._http.patch<UpdateTaskResponse>(`/tasks/${taskId}`, updatedTask);

    return data;
  }

  async deleteTask(taskId: TaskEntity['id']): Promise<void> {
    await this._http.delete(`/tasks/${taskId}`);
  }
}

export const TaskAgentInstance = new TasksAgent();
