import { TaskEntity } from 'domains/index';

export type TaskProps = {
  task: TaskEntity;
  changeTaskImportance: (taskId: TaskEntity['id'], currentStatus: boolean) => void;
  changeTaskComplete: (taskId: TaskEntity['id'], currentStatus: boolean) => void;
  deleteTask: (taskId: TaskEntity['id']) => void;
};
