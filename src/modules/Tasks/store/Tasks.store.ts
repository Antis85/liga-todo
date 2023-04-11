import { makeObservable, observable, action, computed } from 'mobx';
import { PrivateFields } from './Tasks.store.types';
import { SearchFormEntity, TaskEntity, TasksStatsEntity } from 'domains/index';
import { getInternalTasksStats, mapToExternalParams, mapToInternalTasks } from 'helpers/index';
import { TaskAgentInstance } from 'http/index';
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

  private _tasks: TaskEntity[] | null = [];

  private _tasksStats: TasksStatsEntity | null = {
    total: 0,
    important: 0,
    done: 0,
  };

  private _isTasksLoading = false;

  get tasks(): TaskEntity[] | null {
    return this._tasks;
  }

  set tasks(value) {
    this._tasks = value;
  }

  get tasksStats(): TasksStatsEntity | null {
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
    try {
      const externalSearchParams = mapToExternalParams(searchParams);
      const res = await TaskAgentInstance.getAllTasks(externalSearchParams);
      this.tasks = mapToInternalTasks(res);
      this.tasksStats = getInternalTasksStats(res);
    } catch (error) {
      console.log('Tasks.store_loadTasks_error: ', error);
      this.tasks = null;
      this.tasksStats = null;
    } finally {
      this.isTasksLoading = false;
    }
  };

  changeTaskImportance = async (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this.isTasksLoading = true;
    try {
      await TaskAgentInstance.updateTask(taskId, { isImportant: !currentStatus });
      this.loadTasks();
    } catch (error) {
      console.log('changeTaskImportance_error: ', error);
      this.tasks = null;
      this.tasksStats = null;
    } finally {
      this.isTasksLoading = false;
    }
  };

  changeTaskComplete = async (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this.isTasksLoading = true;
    try {
      await TaskAgentInstance.updateTask(taskId, { isCompleted: !currentStatus });
      this.loadTasks();
    } catch (error) {
      console.log('changeTaskComplete_error: ', error);
      this.tasks = null;
      this.tasksStats = null;
    } finally {
      this.isTasksLoading = false;
    }
  };

  deleteTask = async (taskId: TaskEntity['id']) => {
    this.isTasksLoading = true;
    try {
      await TaskAgentInstance.deleteTask(taskId);
      this.loadTasks();
    } catch (error) {
      console.log('deleteTask_error: ', error);
      this.tasks = null;
      this.tasksStats = null;
    } finally {
      this.isTasksLoading = false;
    }
  };
}

export const TasksStoreInstance = new TasksStore();
