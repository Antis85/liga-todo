import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { EditTaskStoreInstance } from './store';
import { EditTaskForm } from './components';
// import { TasksMock, TasksStatsMock } from '__mocks__/index';

interface EditTaskProps {
  id: string | undefined;
}
// type EditTaskProps = string | undefined;
export function EditTaskProto({ id }: EditTaskProps) {
  console.log('EditTask_props_id: ', id);
  console.log('EditTask_id: ', id);
  // useEffect((): void => {
  //   EditTaskStoreInstance.loadTask(id);
  // }, [id]);
  return <EditTaskForm />;
}

export const EditTask = observer(EditTaskProto);
