import { paths } from './todo.swagger';

export type GetAllTasksQuery = paths['/tasks']['get']['parameters']['query'];
export type GetAllTasksResponse = paths['/tasks']['get']['responses']['200']['content']['application/json'];
export type GetTaskResponse = paths['/tasks/{taskId}']['get']['responses']['200']['content']['application/json'];
export type UpdateTaskQuery = paths['/tasks/{taskId}']['patch']['requestBody']['content']['application/json'];
export type UpdateTaskResponse = paths['/tasks/{taskId}']['patch']['responses']['200']['content']['application/json'];
export type CreateTaskQuery = paths['/tasks']['post']['requestBody']['content']['application/json'];
export type CreateTaskResponse = paths['/tasks']['post']['responses']['200']['content']['application/json'];
