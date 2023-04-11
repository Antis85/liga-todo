import React from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from 'components/index';
import { EditTask } from 'modules/index';

export function EditTaskPage() {
  const params = useParams();

  return (
    <PageContainer>
      <h1>TODO LIST | EDIT TASK {params.taskId}</h1>
      <EditTask />
    </PageContainer>
  );
}
