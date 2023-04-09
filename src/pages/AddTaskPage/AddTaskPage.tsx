import React from 'react';
import { PageContainer } from 'components/index';
import { AddTask } from 'modules/index';

export function AddTaskPage() {
  return (
    <PageContainer>
      <h1>TODO LIST | ADD TASK</h1>
      <AddTask />
    </PageContainer>
  );
}
