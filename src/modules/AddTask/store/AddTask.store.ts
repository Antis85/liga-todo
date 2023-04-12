import { makeObservable, observable, action, computed } from 'mobx';
import { PrivateFields } from './AddTask.store.types';
import { mapToInternalTask } from 'helpers/index';
import { FormTaskEntity } from 'domains/index';
import { TaskAgentInstance } from 'http/index';
export class AddTaskStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _errorText: observable,
      _isRequestActive: observable,

      addTask: action,

      errorText: computed,
      isRequestActive: computed,
    });
  }

  private _errorText = '';

  private _isRequestActive = false;

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

  async addTask(addTaskParams: FormTaskEntity) {
    this.isRequestActive = true;
    try {
      const data = await TaskAgentInstance.createTask(addTaskParams);
      const task = mapToInternalTask(data);
      if (task?.id) return true;
      if (!task || !task?.id) this.errorText = 'Ошибка. Задача не добавлена. Попробуйте создать задачу еще раз...';
    } catch (error) {
      console.log('addTask_error: ', error);
      this.errorText = 'Ошибка. Задача не добавлена. Попробуйте создать задачу еще раз...';
    } finally {
      this.isRequestActive = false;
    }
  }
}

export const AddTaskStoreInstance = new AddTaskStore();
