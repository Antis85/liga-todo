import { FormTaskEntity } from 'domains/index';

export const defaultEditTaskFormValues: FormTaskEntity = {
  name: '',
  info: '',
  isImportant: false,
  isDone: false,
};
