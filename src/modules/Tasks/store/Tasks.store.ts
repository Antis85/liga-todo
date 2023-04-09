import { makeObservable, observable, action, computed } from 'mobx';
import { delay } from 'helpers/index';
import { SearchFormEntity, TaskEntity, TasksStatsEntity } from 'domains/index';
import { TasksMock, TasksStatsMock } from '__mocks__/index';
//////////////////////////////////////////////////////////////////
type PrivateFields = '_tasks' | '_tasksStats' | '_isTasksLoading';
//////////////////////////////////////////////////////////////////
export class TasksStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _tasks: observable,
      _tasksStats: observable,
      _isTasksLoading: observable,

      loadTasks: action,
      changeTaskImportance: action,
      changeTaskComplete: action,
      deleteTask: action,

      tasks: computed,
      isTasksLoading: computed,
    });
  }

  private _tasks: TaskEntity[] = [];

  private _tasksStats: TasksStatsEntity = {
    total: 0,
    important: 0,
    done: 0,
  };

  private _isTasksLoading = false;

  get tasks(): TaskEntity[] {
    return this._tasks;
  }

  set tasks(value) {
    this._tasks = value;
  }

  get tasksStats(): TasksStatsEntity {
    return this._tasksStats;
  }

  set tasksStats(value) {
    this._tasksStats = value;
  }

  get isTasksLoading(): boolean {
    return this._isTasksLoading;
  }

  set isTasksLoading(value) {
    this._isTasksLoading = value;
  }

  loadTasks = async (searchParams?: SearchFormEntity) => {
    this.isTasksLoading = true;
    // console.log('isTasksLoading', this._isTasksLoading);
    console.log('searchParams', searchParams);
    // TODO: Убрать моки, привязаться к бэку
    this.tasks = TasksMock;
    // console.log('this.tasks', this.tasks);
    this.tasksStats = TasksStatsMock;
    await delay(3000);
    this.isTasksLoading = false;
  };

  changeTaskImportance = (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this.isTasksLoading = true;
    // TODO: Добавить запрос к серверу
    console.log('important', taskId, !currentStatus);
    this.loadTasks();
  };

  changeTaskComplete = (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this.isTasksLoading = true;
    // TODO: Добавить запрос к серверу
    console.log('complete', taskId, !currentStatus);
    this.loadTasks();
  };

  deleteTask = (taskId: TaskEntity['id']) => {
    this.isTasksLoading = true;
    // TODO: Добавить запрос к серверу
    console.log('delete', taskId);
    this.loadTasks();
  };
}

export const TasksStoreInstance = new TasksStore();
