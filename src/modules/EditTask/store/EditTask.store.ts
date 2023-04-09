import { makeObservable, observable, action, computed } from 'mobx';
import { delay } from 'helpers/index';
import { SearchFormEntity, TaskEntity, TasksStatsEntity } from 'domains/index';
import { TasksMock, TasksStatsMock } from '__mocks__/index';
//////////////////////////////////////////////////////////////////
type PrivateFields = '_task' | '_isRequestActive' | '_errorText';
// type AddTaskEntity = Omit<TaskEntity, 'id'>;
type EditTaskId = string | undefined;
//////////////////////////////////////////////////////////////////
export class EditTaskStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _task: observable,
      _errorText: observable,
      _isRequestActive: observable,

      loadTask: action,
      editTask: action,

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

  get isRequestActive(): boolean {
    return this._isRequestActive;
  }

  set isRequestActive(value) {
    this._isRequestActive = value;
  }

  loadTask = async (id: EditTaskId) => {
    this.isRequestActive = true;
    console.log('loadTask_id', id);
    console.log('loadTask_TasksMock[0]', TasksMock[0]);
    //TODO: GET запрос на сервер
    this.task = TasksMock[0];
    // this.task = {
    //   id: '123',
    //   name: '456',
    //   info: '789',
    //   isImportant: true,
    //   isDone: true,
    // };
    await delay(3000);
    // console.log('loadTask_this.task', this.task);
    this.isRequestActive = false;
    return true;
  };

  editTask = async (editTaskParams?: TaskEntity) => {
    this.isRequestActive = true;
    console.log('editTaskParams', editTaskParams);
    console.log(this.task.id, this.task.name, this.task.info, this.task.isImportant, this.task.isDone);
    //TODO: POST запрос на сервер
    await delay(3000);
    this.isRequestActive = false;
    return true;
  };
}

export const EditTaskStoreInstance = new EditTaskStore();
