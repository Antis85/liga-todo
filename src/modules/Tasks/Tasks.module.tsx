import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { TasksStats, TasksList, SearchForm } from './components';
import { TasksStoreInstance } from './store';
// import { TasksMock, TasksStatsMock } from '__mocks__/index';

export function TasksProto() {
  useEffect((): void => {
    TasksStoreInstance.loadTasks();
  }, []);
  return (
    <>
      <SearchForm />
      <TasksStats />
      <TasksList />
    </>
  );
}

export const Tasks = observer(TasksProto);
