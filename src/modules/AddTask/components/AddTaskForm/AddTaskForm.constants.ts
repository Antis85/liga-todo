import { FormTaskEntity } from 'domains/index';

export const defaultAddTaskFormValues: FormTaskEntity = {
  name: '',
  info: '',
  isImportant: false,
  isDone: false,
};
