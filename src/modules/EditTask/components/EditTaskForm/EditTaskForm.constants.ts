import { TaskFormEntity } from 'domains/index';

export const defaultEditTaskFormValues: TaskFormEntity = {
  name: '',
  info: '',
  isImportant: false,
  isDone: false,
};
