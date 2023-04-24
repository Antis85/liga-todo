import { makeObservable, observable, action, computed } from 'mobx';
import { PrivateFields } from './EditTask.store.types';
import { mapToExternalTask, mapToInternalTask } from 'helpers/index';
import { TaskFormEntity, TaskEntity } from 'domains/index';
import { TaskAgentInstance } from 'http/index';
export class EditTaskStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _task: observable,
      _errorText: observable,
      _isRequestActive: observable,

      loadTask: action.bound,
      editTask: action.bound,

      task: computed,
      errorText: computed,
      isRequestActive: computed,
    });
  }

  private _task: TaskEntity = {
    id: '',
    name: '',
    info: '',
    isImportant: false,
    isDone: false,
  };

  private _errorText = '';

  private _isRequestActive = false;

  get task(): TaskEntity {
    return this._task;
  }

  set task(task) {
    this._task = task;
  }

  get errorText(): string {
    return this._errorText;
  }

  set errorText(text: string) {
    this._errorText = text;
  }

  get isRequestActive(): boolean {
    return this._isRequestActive;
  }

  set isRequestActive(value) {
    this._isRequestActive = value;
  }

  async loadTask(id: TaskEntity['id'] | undefined) {
    if (!id) {
      this.errorText = `Ошибка загрузки задачи. Отсутствует ID.`;
      return false;
    }
    this.isRequestActive = true;
    try {
      const data = await TaskAgentInstance.getTask(id);
      const task = mapToInternalTask(data);
      if (task?.id) this.task = task;
      if (!task || !task?.id) this.errorText = `Ошибка загрузки задачи id${id}`;
    } catch (error) {
      console.log('EditTaskStore_editTask_error: ', error);
      this.errorText = `Ошибка загрузки задачи id${id}`;
    } finally {
      this.isRequestActive = false;
    }
  }

  async editTask(editTaskParams: TaskFormEntity) {
    this.isRequestActive = true;
    try {
      const externalTaskParams = mapToExternalTask(editTaskParams);
      const data = await TaskAgentInstance.updateTask(this.task.id, externalTaskParams);
      const task = mapToInternalTask(data);
      if (task?.id) return true;
      if (!task || !task?.id) this.errorText = 'Ошибка. Задача не изменена. Попробуйте еще раз...';
    } catch (error) {
      console.log('EditTaskStore_editTask_error: ', error);
      this.errorText = 'Ошибка. Задача не изменена. Попробуйте еще раз...';
    } finally {
      this.isRequestActive = false;
    }
  }
}

export const EditTaskStoreInstance = new EditTaskStore();
