import { TaskFormEntity } from 'domains/index';

export const defaultAddTaskFormValues: TaskFormEntity = {
  name: '',
  info: '',
  isImportant: false,
  isDone: false,
};
