import { makeObservable, observable, action, computed } from 'mobx';
import { delay } from 'helpers/index';
import { SearchFormEntity, TaskEntity, TasksStatsEntity } from 'domains/index';
import { TasksMock, TasksStatsMock } from '__mocks__/index';
//////////////////////////////////////////////////////////////////
type PrivateFields = '_isRequestActive' | '_errorText';
type AddTaskEntity = Omit<TaskEntity, 'id'>;
//////////////////////////////////////////////////////////////////
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

  get isRequestActive(): boolean {
    return this._isRequestActive;
  }

  set isRequestActive(value) {
    this._isRequestActive = value;
  }

  addTask = async (addTaskParams: AddTaskEntity) => {
    this.isRequestActive = true;
    console.log('addTaskParams', addTaskParams);
    //TODO: POST запрос на сервер
    await delay(3000);
    this.isRequestActive = false;
    return true;
  };
}

export const AddTaskStoreInstance = new AddTaskStore();
