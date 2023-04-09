import React from 'react';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { EditTaskStoreInstance } from './store';
import { PageContainer } from 'components/index';
import { EditTask } from 'modules/index';
// import { Tasks } from 'modules/index';
// import { PATH_LIST } from 'constants/index';

export function EditTaskPage() {
  const params = useParams();
  console.log('params: ', params);
  console.log('params.taskId: ', params.taskId);
  const taskId = params.taskId;
  // useEffect(() => {
  //   EditTaskStoreInstance.loadTask(taskId);
  // }, []);
  console.log('EditTask_id: ', taskId);
  return (
    <PageContainer>
      {/* TODO - show task id */}
      <h1>TODO LIST | EDIT TASK {taskId}</h1>
      <EditTask id={taskId} />
    </PageContainer>
  );
}
